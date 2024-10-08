import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importing js-cookie to manage cookies
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  width: '200px',
  margin: '0 auto', // Centering the card horizontally
  borderRadius: '20px',
  border: '1px solid gray',
  textAlign: 'center', // Centering text and content inside the card
  backgroundColor: '#000000',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  input: {
    backgroundColor: '#000000',
    color: '#007FFF',
    borderRadius: '20px',
    border: '1px solid gray',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'gray',
      borderRadius: '20px',
      border: '1px solid gray',
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#000000',
  color: '#007FFF',
  borderRadius: '20px',
  width: '100%',
  border: '1px solid gray',
  '&:hover': {
    backgroundColor: '#000000',
  },
});

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(''); // For displaying errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to /api/login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_id: identifier, // Sending identifier as payment_id
          token: passcode,        // Sending passcode as token
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store the JWT token in a cookie
        Cookies.set('jwtToken', data.token, { expires: 1 }); // Set cookie to expire in 1 day

        // Navigate to the protected members' dashboard
        navigate('/app/dashboard');
      } else {
        // Handle login failure (show error message)
        setError(data.error || 'Login failed, please try again.');
      }
    } catch (err) {
      setError('An error occurred, please try again.');
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom style={{ color: '#007FFF' }}>
          React
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Identifier"
            variant="outlined"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <StyledTextField
            fullWidth
            label="Passcode"
            variant="outlined"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
          />
          {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
          <StyledButton type="submit" variant="contained">
            Login
          </StyledButton>
        </form>
      </CardContent>
    </StyledCard>
  );
};

export default Login;


