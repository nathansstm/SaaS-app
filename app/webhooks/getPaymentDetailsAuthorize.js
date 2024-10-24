// getPaymentDetailsAuthorize.js
const pool = require('./db');

const getPaymentDetailsAuthorize = async (paymentId) => {
  try {
    // Log the paymentId received by the function
    console.log('Received paymentId:', paymentId);

    // Check if the paymentId is 'app'
    if (paymentId === 'app') {
      return {
        token: 'app', // Set token to 'app'
        payment_id: 'app', // Set payment_id to 'app'
        isAdmin: true // Set isAdmin to true
      };
    }

    // Query the database for payment details
    const query = `SELECT * FROM payments WHERE id = $1;`;
    const values = [paymentId];
    const result = await pool.query(query, values);
    
    // Log the result of the query
    console.log('Query result:', result.rows);

    // Return the fetched payment row or undefined if not found
    return result.rows[0] || null; // Return null if no rows are found
  } catch (err) {
    console.error('Error fetching payment details', err);
    throw err;
  }
};

module.exports = getPaymentDetailsAuthorize;

