import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import ComponentDrawerMenu from './components/ComponentDrawerMenu';
import ComponentTopIcons from './components/ComponentTopIcons';
import { SnackbarProvider } from './components/SnackbarContext'; // Adjust the import path

const App = ({ children }) => {
  return (
    <SnackbarProvider> {/* Wrap your layout with SnackbarProvider */}
      <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <AppBar position="static" style={{ backgroundColor: 'black', color: '#007FFF' }}>
          <Toolbar>
            <ComponentDrawerMenu />
            <Box sx={{ flexGrow: 1 }} />
            <ComponentTopIcons />
          </Toolbar>
        </AppBar>
        <div>
          {/* Render the children passed to the App layout */}
          {children}
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default App;

