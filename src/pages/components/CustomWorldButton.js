import React, { useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language'; // MUI globe icon
import { gsap } from 'gsap';

function CustomWorldButton() {
  const buttonRef = useRef(null);

  useEffect(() => {
    // GSAP animation for infinite rotation
    gsap.to(buttonRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1, // Infinite loop
      ease: "linear",
    });
  }, []);

  return (
    <IconButton
      ref={buttonRef}
      style={{
        width: '200px',
        height: '200px',
        border: '1px solid gray',
        color: '#007FFF',
        display: 'flex', // Center the icon
        justifyContent: 'center',
        alignItems: 'center',
      }}
      aria-label="world"
    >
      <LanguageIcon style={{ width: '100%', height: '100%' }} /> {/* Use the MUI globe icon */}
    </IconButton>
  );
}

export default CustomWorldButton;
