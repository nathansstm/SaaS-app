// ./pages/Payments.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/payments');
        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }
        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payments List
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Payment ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Is Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.payment_id}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.currency}</TableCell>
                <TableCell>{payment.payment_method}</TableCell>
                <TableCell>{new Date(payment.created_at).toLocaleString()}</TableCell>
                <TableCell>{payment.token}</TableCell>
                <TableCell>{payment.isAdmin ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Payments;

