import React from 'react';
import CustomWorldButton from './components/CustomWorldButton';

function Saas() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
      height: '100vh' // Full viewport height to center vertically
    }}>
      <h1 style={{ textAlign: 'center' }}>Welcome, React!</h1>
      <CustomWorldButton />
    </div>
  );
}

export default Saas;


