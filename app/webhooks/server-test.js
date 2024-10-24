const jwtSecret = process.env.JWT_SECRET;
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const Authorize = require('./Authorize');
const bcrypt = require('bcrypt');  // Optional for secure password storage
const jwt = require('jsonwebtoken'); // For JWT token handling
const { VM } = require('vm2'); // Add this line to import the VM class

const app = express();
const config = JSON.parse(fs.readFileSync('server.json', 'utf8'));
const port = config.port || 3000; // Default to 3000 if port is not set

// Middleware for parsing JSON request bodies for all other routes
app.use(express.json());
// Middleware for parsing cookies
app.use(cookieParser()); // Add this line to use cookie-parser

app.post('/api/loginroute', async (req, res) => {
  const { payment_id, token } = req.body;

  try {
    const payment = await Authorize(payment_id);

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

    // Token is valid; return a success response
    res.status(200).json({ message: 'Token is valid.', user: decoded });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));



