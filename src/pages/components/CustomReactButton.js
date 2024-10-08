import React from 'react';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as ReactIcon } from './logo.svg'; // Importing as a React component

function CustomReactButton() {
  return (
    <IconButton
      style={{
        width: '200px',
        height: '200px',
        border: '1px solid gray',
        color: '#007FFF',
        animation: 'spin 2s linear infinite', // Optional spinning animation
        display: 'flex', // Center the icon
        justifyContent: 'center',
        alignItems: 'center',
      }}
      aria-label="react"
    >
      <ReactIcon style={{ width: '100%', height: '100%' }} /> {/* Use the SVG as a component */}
    </IconButton>
  );
}

export default CustomReactButton;
