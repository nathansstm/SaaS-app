// ApiAuthorize.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;

// NEW /api/authorize ROUTE (handling JWT from cookies)
router.post('/authorize', (req, res) => {
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

module.exports = router;


