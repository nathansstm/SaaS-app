// ComponentSnackbar.js
import React from 'react';
import { Snackbar, IconButton, SnackbarContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ComponentSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={onClose}
    >
      <SnackbarContent
        sx={{
          backgroundColor: 'black',
          color: '#007FFF',
          padding: '16px',
          width: '300px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',

          '& .MuiSnackbarContent-message': {
            flexGrow: 1,
            textAlign: 'center',
          },
        }}
        message={message}
        action={
          <IconButton 
            size="small" 
            aria-label="close" 
            onClick={onClose} 
            sx={{
              color: '#007FFF',
              position: 'absolute',
              top: 8,
              left: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default ComponentSnackbar;

