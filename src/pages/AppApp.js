import React from 'react';
import CustomReactButton from './components/CustomReactButton';
<<<<<<< HEAD
import CustomMasonryComponent from './components/CustomMasonryComponent'; // Import your CustomMasonryComponent

function AppApp() {
  return (
    <>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        height: '100vh' // Full viewport height to center vertically
      }}>
        <h1 style={{ textAlign: 'center' }}>Welcome, Web!</h1>
        <CustomReactButton />
      </div>
      <div style={{ marginTop: '20px' }}> {/* Add some margin above Masonry */}
        <CustomMasonryComponent />
      </div>
    </>
=======

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
>>>>>>> origin/main
  );
}

export default AppApp;
