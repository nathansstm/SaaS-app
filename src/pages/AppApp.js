import React from 'react';
import CustomReactButton from './components/CustomReactButton';

function AppApp() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
      height: '100vh' // Full viewport height to center vertically
    }}>
      <h1 style={{ textAlign: 'center' }}>Welcome, React!</h1>
      <CustomReactButton />
    </div>
  );
}

export default AppApp;
