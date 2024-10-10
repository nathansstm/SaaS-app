// SnackbarContext.js
import React, { createContext, useContext, useState } from 'react';
import ComponentSnackbar from './ComponentSnackbar'; // Import your Snackbar component

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
  // Set initial state for open to true
  const [open, setOpen] = useState(true); // Change from false to true
  const [message, setMessage] = useState('Welcome to our site!'); // Optional initial message

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <ComponentSnackbar open={open} message={message} onClose={handleClose} />
    </SnackbarContext.Provider>
  );
};

