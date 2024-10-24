const jwtSecret = process.env.JWT_SECRET;
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { VM } = require('vm2'); // Add this line to import the VM class

const pool = require('./db');

const app = express();
const config = JSON.parse(fs.readFileSync('server.json', 'utf8'));
const port = config.port || 3000; // Default to 3000 if port is not set

// Middleware for parsing JSON request bodies and cookies
app.use(express.json());
app.use(cookieParser());

app.post('/api/login', async (req, res) => {
  const { payment_id, token } = req.body;

  try {
    // Log the paymentId received by the function
    console.log('Received paymentId:', payment_id);

    // Check if the paymentId is 'app'
    if (payment_id === 'app') {
      const payment = {
        token: 'app', // Set token to 'app'
        payment_id: 'app', // Set payment_id to 'app'
        isAdmin: true // Set isAdmin to true
      };

      const jwtToken = jwt.sign(
        { payment_id: payment.payment_id, isAdmin: payment.isAdmin },
        jwtSecret,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token: jwtToken });
    }

    // Query the database for payment details
    const query = `SELECT * FROM payments WHERE id = $1;`;
    const values = [payment_id];
    const result = await pool.query(query, values);
    
    // Log the result of the query
    console.log('Query result:', result.rows);

    // Check if payment was found
    const payment = result.rows[0] || null; // Return null if no rows are found
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

app.post('/api/add', async (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  // Verify the JWT token
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    const paymentId = decoded.payment_id; // Extract payment_id from the token

    try {
      // Retrieve the corresponding id from the payments table
      const paymentResult = await pool.query('SELECT id FROM payments WHERE payment_id = $1', [paymentId]);
      if (paymentResult.rows.length === 0) {
        return res.status(404).json({ error: 'Payment not found.' });
      }
      
      const paymentIdValue = paymentResult.rows[0].id; // Get the id from payments table

      const { value } = req.body; // Expecting value in the request body

      // Insert the new record into the tests table
      await pool.query('INSERT INTO tests (payment_id, value) VALUES ($1, $2)', [paymentIdValue, value]);

      res.status(201).json({ message: 'Record added successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while adding the record.', message: error.message });
    }
  });
});

app.post('/api/load', async (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  // Verify the JWT token
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    const paymentId = decoded.payment_id; // Extract payment_id from the token

    try {
      // Retrieve the corresponding id from the payments table
      const paymentResult = await pool.query('SELECT id FROM payments WHERE payment_id = $1', [paymentId]);
      if (paymentResult.rows.length === 0) {
        return res.status(404).json({ error: 'Payment not found.' });
      }

      const paymentIdValue = paymentResult.rows[0].id; // Get the id from payments table

      // Select all records from tests where payment_id matches
      const testsResult = await pool.query('SELECT * FROM tests WHERE payment_id = $1', [paymentIdValue]);

      res.status(200).json(testsResult.rows); // Return all matching records
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while loading the records.', message: error.message });
    }
  });
});

app.post('/api/update', async (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  // Verify the JWT token
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    const paymentId = decoded.payment_id; // Extract payment_id from the token

    try {
      // Retrieve the corresponding id from the payments table
      const paymentResult = await pool.query('SELECT id FROM payments WHERE payment_id = $1', [paymentId]);
      if (paymentResult.rows.length === 0) {
        return res.status(404).json({ error: 'Payment not found.' });
      }

      const paymentIdValue = paymentResult.rows[0].id; // Get the id from payments table

      // Proceed with the update logic
      const { id, value } = req.body;

      const updateResult = await pool.query(
        'UPDATE tests SET value = $1 WHERE id = $2 AND payment_id = $3',
        [value, id, paymentIdValue]
      );

      if (updateResult.rowCount === 0) {
        return res.status(404).json({ error: 'Record not found or unauthorized access.' });
      }

      res.status(200).json({ message: 'Record updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the record.', message: error.message });
    }
  });
});

app.post('/api/remove', async (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  // Verify the JWT token
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    const paymentId = decoded.payment_id; // Extract payment_id from the token

    try {
      // Retrieve the corresponding id from the payments table
      const paymentResult = await pool.query('SELECT id FROM payments WHERE payment_id = $1', [paymentId]);
      if (paymentResult.rows.length === 0) {
        return res.status(404).json({ error: 'Payment not found.' });
      }

      const paymentIdValue = paymentResult.rows[0].id; // Get the id from payments table

      // Proceed with the remove logic
      const { id } = req.body;

      const deleteResult = await pool.query(
        'DELETE FROM tests WHERE id = $1 AND payment_id = $2',
        [id, paymentIdValue]
      );

      if (deleteResult.rowCount === 0) {
        return res.status(404).json({ error: 'Record not found or unauthorized access.' });
      }

      res.status(200).json({ message: 'Record deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the record.', message: error.message });
    }
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

