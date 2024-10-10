// ./pages/Dashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import CustomChartComponent from './components/CustomChartComponent'; // Import the custom component

function Dashboard() {
  return (
    <Container className="App" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Component
      </Typography>
      <CustomChartComponent /> {/* Use the preset component */}

    </Container>
  );
}

export default Dashboard;

