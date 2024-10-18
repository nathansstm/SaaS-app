// ./pages/Dashboard.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CustomDynamicInputComponent from './components/CustomDynamicInputComponent';
import CustomPipelineComponent from './components/CustomPipelineComponent';
import CustomDataGridComponent from './components/CustomDataGridComponent'; // Import CustomDataGridComponent
import { CustomRecordsProvider } from './components/CustomRecordsContext'; // Import the CustomRecordsProvider

function Dashboard() {
  return (
    <CustomRecordsProvider>
      <Container className="App" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Component
        </Typography>

        {/* Box for stacking components, allowing them to push each other down */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          
          {/* CustomDynamicInputComponent grows naturally without restriction */}
          <Box sx={{ width: '100%', paddingBottom: 2 }}>
            <CustomDynamicInputComponent />
          </Box>
          
          {/* CustomPipelineComponent naturally pushed down by the growing inputs */}
          <Box sx={{ width: '100%' }}>
            <CustomPipelineComponent />
          </Box>

          {/* Add the CustomDataGridComponent here */}
          <Box sx={{ width: '100%' }}>
            <CustomDataGridComponent />
          </Box>
        </Box>
      </Container>
    </CustomRecordsProvider>
  );
}

export default Dashboard;


