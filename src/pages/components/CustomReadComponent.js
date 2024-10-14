import React, { useState } from 'react';
import { InputBase, IconButton, Box, Typography, Card } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CustomReadComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [responses, setResponses] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue) return;

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inputValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponses((prevResponses) => [...prevResponses, data.output]);
      } else {
        console.error('Failed to fetch response');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setInputValue(''); // Clear input after submission
    }
  };

  return (
    <Card
      sx={{
        width: '400px',
        borderRadius: '20px',
        border: '1px solid gray',
        backgroundColor: 'black',
        color: '#007FFF',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          maxHeight: '150px',
          mb: '16px',
          padding: '8px',
          backgroundColor: 'black',
          color: '#007FFF',
          borderRadius: '10px',
        }}
      >
        {responses.map((response, index) => (
          <Typography key={index} sx={{ fontSize: '32px' }}>
            {response}
          </Typography>
        ))}
      </Box>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            placeholder="REPL"
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              flex: 1,
              fontSize: '32px',
              color: '#007FFF',
            }}
          />
          <IconButton type="submit" sx={{ p: '32px' }}>
            <SearchIcon sx={{ color: '#007FFF' }} />
          </IconButton>
        </Box>
      </form>
    </Card>
  );
};

export default CustomReadComponent;
