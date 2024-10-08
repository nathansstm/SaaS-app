import React from 'react';
import CustomIconButtons from './components/CustomIconButtons';
import CustomAccountButtons from './components/CustomAccountButtons';

function Settings() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome, React!</h1>
      <CustomIconButtons />
      <CustomAccountButtons /> {/* Add the new component here */}
    </div>
  );
}

export default Settings;
