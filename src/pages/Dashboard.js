// ./pages/Dashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import CustomChartComponent from './components/CustomChartComponent'; // Import the custom chart component
import CustomPipelineComponent from './components/CustomPipelineComponent';   // Import the custom YAML component

function Dashboard() {
  return (
    <Container className="App" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Component
      </Typography>
      <CustomChartComponent /> {/* Use the chart component */}
      <CustomPipelineComponent />   {/* Add the Pipeline component below */}
    </Container>
  );
}

export default Dashboard;
