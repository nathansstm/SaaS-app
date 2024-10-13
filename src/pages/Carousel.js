import React from 'react';
import CustomReactButton from './components/CustomReactButton';
import CustomCarouselComponent from './components/CustomCarouselComponent';

function Carousel() {
  return (
    <>
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
  
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
        <CustomCarouselComponent />
      </div>
    </>
  );
}

export default Carousel;


