import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';
import { Typography, Link, Box } from '@mui/material'; // Using Material-UI components

const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Navigation function
  const navigateOpen = (path) => {
    navigate(path); // Use navigate to change the route
  };

  useEffect(() => {
    // Clear the JWT cookie by setting its expiry to a past date
    Cookies.remove('jwtToken', { path: '/' });
  }, []);

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" style={{ color: '#007FFF' }}>Bye</Typography>
      <Typography variant="body1" mt={2} style={{ color: '#007FFF' }}>
        You've been logged out.
      </Typography>
      <Link
        onClick={() => navigateOpen('/app/login')} // Navigate on click
        mt={3}
        underline="hover"
        style={{ color: '#007FFF', cursor: 'pointer' }} // Ensure pointer cursor for clickable element
      >
        Signin again
      </Link>
    </Box>
  );
};

export default Logout;
