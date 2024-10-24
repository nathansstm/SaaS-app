// ApiLoad.js
const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Import the database pool
const router = express.Router();

// Get JWT secret from environment variables
const jwtSecret = process.env.JWT_SECRET;

// NEW /api/load ROUTE
router.post('/load', async (req, res) => {
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

module.exports = router;


