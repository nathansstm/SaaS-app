import React, { useEffect } from 'react';
import { useSnackbar } from './layouts/components/SnackbarContext';
import { useLocation } from 'react-router-dom';

const AppOpen = ({ children }) => {
  const showSnackbar = useSnackbar();
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.split('/').pop(); // Get the last segment of the path

    // Make a fetch request to your backend route
    const sendTrace = async () => {
      try {
        const response = await fetch(`/api/span/${page}`, {
          method: 'GET', // Change method to GET
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          showSnackbar('Span Pushed!');
        } else {
          throw new Error('Span Failed');
        }
      } catch (error) {
        showSnackbar('Span Error!');
      }
    };

    sendTrace();
  }, [location.pathname]);

  return <>{children}</>;
};

export default AppOpen;
