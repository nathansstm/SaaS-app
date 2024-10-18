// ./components/CustomRecordsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSnackbar } from '../../layouts/components/SnackbarContext'; // Adjust the path if necessary

const RecordsContext = createContext();

export const useRecords = () => useContext(RecordsContext);

export const CustomRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const showSnackbar = useSnackbar();

  // Function to load records from the backend (POST)
  const loadRecords = async () => {
    const jwtToken = Cookies.get('jwtToken');

    if (!jwtToken) {
      showSnackbar('No token found');
      return;
    }

    try {
      const response = await fetch('/api/load', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setRecords(data.reverse());
      } else {
        showSnackbar(`Load Failed: ${data.error} ${data.message}`);
      }
    } catch (error) {
      showSnackbar(`Load Error: ${error.message}`);
    }
  };

  // Load records when the component mounts
  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <RecordsContext.Provider value={{ records, setRecords, loadRecords }}>
      {children}
    </RecordsContext.Provider>
  );
};


