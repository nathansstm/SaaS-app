// ApiLogout.js
const express = require('express');
const router = express.Router();

// LOGOUT ROUTE
router.post('/logout', (req, res) => {
  // Since the session is handled client-side with sessionStorage, no need to do anything server-side.
  res.status(200).json({ message: 'Logout successful!' });
});

module.exports = router;


