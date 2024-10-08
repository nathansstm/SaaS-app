import React from 'react';
import { IconButton } from '@mui/material'; // Assuming you're using Material-UI for IconButton
import CoPresentIcon from '@mui/icons-material/CoPresent';
import BarChartIcon from '@mui/icons-material/BarChart';
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CustomAccountButtons() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Navigation function
  const navigateOpen = (path) => {
    navigate(path); // Use navigate to change the route
  };

  const buttonStyle = {
    border: '1px solid gray',
    color: '#007FFF',
    width: '50px',
    height: '50px',
    margin: '5px 0', // Optional: Adds space between buttons
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton style={buttonStyle} onClick={() => navigateOpen('/app/login')}>
        <CoPresentIcon />
      </IconButton>
      <IconButton style={buttonStyle} onClick={() => navigateOpen('/app/dashboard')}>
        <BarChartIcon />
      </IconButton>
      <IconButton style={buttonStyle} onClick={() => navigateOpen('/app/logout')}>
        <BlockIcon />
      </IconButton>
    </div>
  );
}

export default CustomAccountButtons;
