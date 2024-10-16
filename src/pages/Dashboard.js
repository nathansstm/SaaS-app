// ./pages/Dashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import CustomPipelineComponent from './components/CustomPipelineComponent';   // Import the custom YAML component

function Dashboard() {
  return (
    <Container className="App" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Component
      </Typography>
      <CustomPipelineComponent />   {/* Add the Pipeline component below */}
    </Container>
  );
}

export default Dashboard;
