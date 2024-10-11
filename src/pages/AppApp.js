import React, { useState } from 'react';
import CustomReactButton from './components/CustomReactButton';
import CustomMasonryComponent from './components/CustomMasonryComponent'; // Import your CustomMasonryComponent
import CustomSearchComponent from './components/CustomSearchComponent'; // Import the new search component

function AppApp() {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  // Function to handle search logic
  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
  };

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

      {/* Add the search component right before Masonry */}
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
        <CustomSearchComponent onSearch={handleSearch} /> {/* Pass handleSearch to search component */}
      </div>

      <div style={{ marginTop: '20px' }}> {/* Add some margin above Masonry */}
        <CustomMasonryComponent searchQuery={searchQuery} /> {/* Pass search query to Masonry */}
      </div>
    </>
  );
}

export default AppApp;
