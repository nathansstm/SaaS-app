const jwtSecret = process.env.JWT_SECRET;
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const stripe = require('stripe')(process.env.STRIPE_API_TOKEN); // Use environment variable for Stripe API token
const savePaymentToDatabase = require('./savePaymentToDatabase');
const getPaymentDetails = require('./getPaymentDetails');
const getAllPayments = require('./getAllPayments');
const getPaymentDetailsAuthorize = require('./getPaymentDetailsAuthorize');
const bcrypt = require('bcrypt');  // Optional for secure password storage
const jwt = require('jsonwebtoken'); // For JWT token handling

// Load port configuration from server.json
const config = JSON.parse(fs.readFileSync('server.json', 'utf8'));
const port = config.port || 3000; // Default to 3000 if port is not set

// Middleware for parsing raw request bodies for specific endpoints like Stripe webhooks
app.use('/webhook/stripe', bodyParser.raw({ type: 'application/json' }));

// Middleware for parsing JSON request bodies for all other routes
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser()); // Add this line to use cookie-parser

if (!webhookSecret) {
  process.exit(1);  // Exit the process if the environment variable is missing
}

if (!jwtSecret) {
  process.exit(1);  // Exit if JWT secret is missing
}

// Webhook to listen for Stripe events
app.post('/webhook/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Insert payment into PostgreSQL securely
    try {
      const savedPayment = await savePaymentToDatabase(paymentIntent);
      res.status(200).send({ received: true });
    } catch (err) {
      res.status(500).send({ error: 'Failed to save payment.' });
    }
  } else {
    res.status(400).end();
  }
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

    // Token is valid; return a success response
    res.status(200).json({ message: 'Token is valid.', user: decoded });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));


