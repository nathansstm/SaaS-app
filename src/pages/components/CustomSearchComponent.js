import React from 'react';
import { InputBase, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CustomSearchComponent = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);  // Pass the search value back to the parent component
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#000000',
        borderRadius: '20px',
        border: '1px solid gray',
        width: '100%',
        maxWidth: 400,
        boxSizing: 'border-box',
        padding: '2px 8px',
      }}
    >
      <InputBase
        placeholder="Search"
        value={query}
        onChange={handleSearchChange}
        sx={{
          flex: 1,
          fontSize: '32px',
          color: '#007FFF',
        }}
      />
      <IconButton 
        type="submit" 
        sx={{ p: '32px' }}
      >
        <SearchIcon sx={{ color: '#007FFF' }} />
      </IconButton>
    </Box>
  );
};

export default CustomSearchComponent;


