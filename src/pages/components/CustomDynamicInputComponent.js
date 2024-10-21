// ./components/CustomDynamicInputComponent.js
import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Cookies from 'js-cookie';
import { useSnackbar } from '../../layouts/components/SnackbarContext';
import { useRecords } from './CustomRecordsContext'; // Import the context

const CustomDynamicInputComponent = () => {
  const { records, setRecords, loadRecords } = useRecords(); // Get the shared records state and function
  const [inputFields, setInputFields] = useState([]);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    // Load records initially into input fields
    if (records) {
      setInputFields(records.map(record => ({ id: record.id, value: record.value })));
    }
  }, [records]);

  // Function to send a request to update a record
  const sendUpdateRequest = async (id, value) => {
    const jwtToken = Cookies.get('jwtToken'); // Retrieve the JWT token from cookies

    if (!jwtToken) {
      showSnackbar('No token found');
      return;
    }

    try {
      const response = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`, // Send the token in the headers
        },
        body: JSON.stringify({ id, value }), // Send the id and updated value in the request body
        credentials: 'include', // Ensures cookies are included in the request
      });

      const data = await response.json();
      if (response.ok) {
        showSnackbar(`Updated successfully`);
      } else {
        showSnackbar(`Update Failed ${data.error} ${data.message}`);
      }
    } catch (error) {
      showSnackbar(`Update Error ${error.message}`);
    }
  };

  // Updated function to handle input field change
  const handleInputChange = (index, event) => {
    const newFields = [...inputFields];
    newFields[index].value = event.target.value;
    setInputFields(newFields);

    // Send update request for the input field on change
    const { id, value } = newFields[index];
    if (id) { // Only send update request if the id is available
      sendUpdateRequest(id, event.target.value);
    }
  };

  const sendAddRequest = async (value) => {
    const jwtToken = Cookies.get('jwtToken');

    if (!jwtToken) {
      showSnackbar('No token found');
      return;
    }

    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ value }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        showSnackbar('Added successfully');
        loadRecords(); // Reload records after adding
      } else {
        showSnackbar(`Add Failed: ${data.error} ${data.message}`);
      }
    } catch (error) {
      showSnackbar(`Add Error: ${error.message}`);
    }
  };

  const addNewField = () => {
    const newValue = { id: null, value: '' };
    setInputFields(prevFields => [newValue, ...prevFields]);
    sendAddRequest(newValue.value); // Send request on adding new field
  };

  const handleRemoveField = async (id) => {
    const jwtToken = Cookies.get('jwtToken');

    if (!jwtToken) {
      showSnackbar('No token found');
      return;
    }

    try {
      const response = await fetch('/api/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ id }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        showSnackbar('Removed successfully');
        setInputFields(inputFields.filter(field => field.id !== id)); // Remove from local state
        loadRecords(); // Reload records after removing
      } else {
        showSnackbar(`Remove Failed: ${data.error} ${data.message}`);
      }
    } catch (error) {
      showSnackbar(`Remove Error: ${error.message}`);
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
      <Box width="200px" bgcolor="black" p={2} display="flex" flexDirection="column" alignItems="stretch" style={{ gap: '10px' }}>
        {inputFields.map((field, index) => (
          <React.Fragment key={index}>
            <Box display="flex" alignItems="center" justifyContent="space-between" style={{ marginBottom: '10px', backgroundColor: 'black', padding: '5px', borderRadius: '20px', border: '1px solid gray' }}>
              <TextField
                label="Add New"
                variant="outlined"
                value={field.value}
                onChange={(e) => handleInputChange(index, e)}
                InputLabelProps={{ style: { color: '#007FFF' } }}
                inputProps={{ style: { color: '#007FFF', backgroundColor: 'black', borderRadius: '20px' } }}
                fullWidth
                style={{ marginRight: '10px', backgroundColor: 'black', borderRadius: '20px', border: '1px solid gray' }}
              />
              <IconButton onClick={addNewField} style={{ backgroundColor: 'black', borderRadius: '50%', border: '1px solid gray', color: '#007FFF', padding: '10px' }}>
                <AddIcon />
              </IconButton>
            </Box>
            {field.id && ( // Show remove link only if there's a valid id
              <Link
                component="button"
                variant="body2"
                onClick={() => handleRemoveField(field.id)}
                style={{ color: '#007FFF', textDecoration: 'underline' }}
              >
                Remove
              </Link>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default CustomDynamicInputComponent;


