// ./pages/Dashboard.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CustomDynamicInputComponent from './components/CustomDynamicInputComponent';
import CustomPipelineComponent from './components/CustomPipelineComponent';
import CustomDataGridComponent from './components/CustomDataGridComponent';
import CustomSpanComponent from './components/CustomSpanComponent';
import CustomGroupComponent from './components/CustomGroupComponent';
import CustomMapComponent from './components/CustomMapComponent';
import CustomSourceComponent from './components/CustomSourceComponent';
import { CustomRecordsProvider } from './components/CustomRecordsContext';

function Dashboard() {
  return (
    <CustomRecordsProvider>
      <Container className="App" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Component
        </Typography>

        {/* Box for stacking components, allowing them to push each other down */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
  
          {/* CustomSourceComponent graph */}
          <Box sx={{ width: '100%' }}>
            <CustomSourceComponent />
          </Box>
  
          {/* CustomMapComponent graph */}
          <Box sx={{ width: '100%' }}>
            <CustomMapComponent />
          </Box>
  
          {/* CustomGroupComponent graph */}
          <Box sx={{ width: '100%' }}>
            <CustomGroupComponent />
          </Box>
  
          {/* CustomSpanComponent graph */}
          <Box sx={{ width: '100%' }}>
            <CustomSpanComponent />
          </Box>
          
          {/* CustomDynamicInputComponent grows naturally without restriction */}
          <Box sx={{ width: '100%', paddingBottom: 2 }}>
            <CustomDynamicInputComponent />
          </Box>
          
          {/* CustomDataGridComponent naturally pushed down by the growing inputs */}
          <Box sx={{ width: '100%' }}>
            <CustomDataGridComponent />
          </Box>

          {/* Add the CustomPipelineComponent here */}
          <Box sx={{ width: '100%' }}>
            <CustomPipelineComponent />
          </Box>
        </Box>
      </Container>
    </CustomRecordsProvider>
  );
}

export default Dashboard;



