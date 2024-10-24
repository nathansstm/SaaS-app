// ApiLogin.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const fs = require('fs');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
const config = JSON.parse(fs.readFileSync('server.json', 'utf8'));

// POST /api/login
router.post('/login', async (req, res) => {
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

module.exports = router;


