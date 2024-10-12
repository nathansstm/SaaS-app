const jwtSecret = process.env.JWT_SECRET;
const fs = require('fs');
const express = require('express');
const readline = require('readline');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { VM } = require('vm2'); // Add this line to import the VM class

const savePaymentToDatabase = require('./savePaymentToDatabase');
const getPaymentDetails = require('./getPaymentDetails');
const getAllPayments = require('./getAllPayments');
const getPaymentDetailsAuthorize = require('./getPaymentDetailsAuthorize');

const app = express();
const config = JSON.parse(fs.readFileSync('server.json', 'utf8'));
const port = config.port || 3000; // Default to 3000 if port is not set

// Middleware for parsing JSON request bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Helper function to get the last 7 days' dates
const getLastSevenDays = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD format
    dates.push(formattedDate);
  }
  return dates;
};

// Helper function specific to this route to get the last 7 days' dates
const getLastSevenDaysForLogs = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD format
    dates.push(formattedDate);
  }
  return dates;
};

// Updated /api/logs route
app.get('/api/logs', (req, res) => {
  // Load logs.json directly with one-liner
  let logs;
  try {
    logs = JSON.parse(fs.readFileSync('logs.json', 'utf8'));
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load logs.json' });
  }

  const lastSevenDays = getLastSevenDaysForLogs();  // Use new helper function
  const trafficData = {};

  // Initialize trafficData object for each log with last 7 days
  Object.keys(logs).forEach(logKey => {
    trafficData[logKey] = {};
    lastSevenDays.forEach(date => {
      trafficData[logKey][date] = 0;
    });
  });

  const processLog = (logKey, logFilePath) => {
    return new Promise((resolve, reject) => {
      // Make sure the file exists before processing
      if (!fs.existsSync(logFilePath)) {
        return reject(new Error(`Log file not found: ${logFilePath}`));
      }

      const logStream = readline.createInterface({
        input: fs.createReadStream(logFilePath),
        output: process.stdout,
        terminal: false,
      });

      logStream.on('line', (line) => {
        // Assuming the log format is like "Mon DD HH:MM:SS"
        const logDateMatch = line.match(/^(\w{3})\s+(\d{1,2})/);
        if (logDateMatch) {
          const [_, month, day] = logDateMatch;
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const monthIndex = monthNames.indexOf(month) + 1;
          const year = new Date().getFullYear(); // Assuming current year
          const formattedDate = `${year}-${monthIndex.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;

          if (trafficData[logKey][formattedDate] !== undefined) {
            trafficData[logKey][formattedDate]++;
          }
        }
      });

      logStream.on('close', resolve);
      logStream.on('error', reject);
    });
  };

  // Process each log file
  const logProcessingPromises = Object.entries(logs).map(([logKey, logFilePath]) =>
    processLog(logKey, logFilePath)
  );

  Promise.all(logProcessingPromises)
    .then(() => {
      // Convert trafficData into the desired format
      const responseData = Object.keys(trafficData).reduce((acc, logKey) => {
        acc[logKey] = Object.entries(trafficData[logKey]).map(([date, requests]) => ({
          date,
          requests,
        }));
        return acc;
      }, {});

      res.json({ trafficData: responseData });
    })
    .catch((error) => {
      console.error('Error processing logs:', error);
      res.status(500).json({ error: 'Failed to process log files' });
    });
});

// NEW API route to get traffic data from syslog for the last 7 days
app.get('/api/traffic', (req, res) => {
  const logFilePath = '/var/log/auth.log.1'; // Path to the syslog

  const trafficData = {};
  const lastSevenDays = getLastSevenDays();

  // Initialize trafficData object with the last 7 days
  lastSevenDays.forEach(date => {
    trafficData[date] = 0;
  });

  // Create a read stream to process the log file line by line
  const logStream = readline.createInterface({
    input: fs.createReadStream(logFilePath),
    output: process.stdout,
    terminal: false,
  });

  logStream.on('line', (line) => {
    // Extract the date from the syslog line (assuming syslog uses "Mon DD HH:MM:SS" format)
    const logDateMatch = line.match(/^(\w{3})\s+(\d{1,2})/); // Extract month and day
    if (logDateMatch) {
      const [_, month, day] = logDateMatch;
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIndex = monthNames.indexOf(month) + 1;
      const year = new Date().getFullYear(); // Use the current year
      const formattedDate = `${year}-${monthIndex.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;

      if (trafficData[formattedDate] !== undefined) {
        trafficData[formattedDate]++;
      }
    }
  });

  logStream.on('close', () => {
    // Convert trafficData into the desired format
    const responseData = {
      trafficData: Object.entries(trafficData).map(([date, requests]) => ({
        date,
        requests,
      })),
    };

    res.json(responseData); // Send the JSON response
  });

  logStream.on('error', (err) => {
    res.status(500).json({ error: 'Failed to read the log file' });
  });
});

// API route for React to fetch payment data by ID
app.get('/api/payment/:id', async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await getPaymentDetails(paymentId);
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment details.' });
  }
});

// New API route to return all payments
app.get('/api/payments', async (req, res) => {
  try {
    const payments = await getAllPayments();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all payments.' });
  }
});

// API route for login, handling payment details authorization
app.post('/api/login', async (req, res) => {
  const { payment_id, token } = req.body;

  try {
    const payment = await getPaymentDetailsAuthorize(payment_id);

    if (!payment) {
      return res.status(404).json({ error: 'Invalid username or password.' });
    }

    const storedToken = payment.token;
    const isValid = storedToken === token;

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const jwtToken = jwt.sign(
      { payment_id: payment.payment_id, isAdmin: payment.isAdmin },
      jwtSecret,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token: jwtToken });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});

// LOGOUT ROUTE
app.post('/api/logout', (req, res) => {
  // Since the session is handled client-side with sessionStorage, no need to do anything server-side.
  res.status(200).json({ message: 'Logout successful!' });
});

// NEW /api/authorize ROUTE (handling JWT from cookies)
app.post('/api/authorize', (req, res) => {
  const token = req.cookies.jwtToken;  // Assuming JWT is stored in 'jwtToken' cookie

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  // Verify the JWT token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    res.status(200).json({ message: 'Token is valid.', user: decoded });
  });
});

app.post('/api/send', (req, res) => {
  const { code } = req.body; // Get the JavaScript code from the request body

  // Basic validation to check if code is provided
  if (!code) {
    return res.status(400).json({ output: 'No code provided.' });
  }

  // Initialize an array to capture console output
  let consoleOutput = [];

  const vm = new VM({
    timeout: 1000, // Set a timeout for execution
    sandbox: {
      console: {
        log: (...args) => {
          // Capture console log output and push it to the array
          consoleOutput.push(args.map(arg => String(arg)).join(' '));
        },
      },
    },
  });

  // Prepare the code to be run in the VM with custom error handling
  const wrappedCode = `
    (() => {
        try {
            ${code}; // Execute user code
            return;
        } catch (err) {
            return { error: String(err) }; // Return error object
        }
    })();
  `;

  try {
    // Run the wrapped code in the VM
    const output = vm.run(wrappedCode);

    // Log the captured console output for debugging
    console.log('Captured Console Output:', consoleOutput);

    // Determine what to return based on the console output
    const finalOutput = consoleOutput.length > 0 
      ? consoleOutput.join('\n') // Join console logs into a single string
      : output && output.error 
        ? output.error // If there's an error, use that
        : typeof output === 'object' ? JSON.stringify(output) : String(output); // Otherwise, stringify the output

    // Return the final output as JSON
    res.json({ output: finalOutput });
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).json({ output: 'Failed to execute code.', details: error.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
