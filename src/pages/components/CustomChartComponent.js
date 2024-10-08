import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically registers the charts
import { Box } from '@mui/material';

const CustomChartComponent = () => {
  const [trafficData, setTrafficData] = useState({});

  useEffect(() => {
    // Fetch traffic data from the backend
    fetch('/api/logs')
      .then(response => response.json())
      .then(data => setTrafficData(data.trafficData)) // Update with correct data path
      .catch(error => console.error('Error fetching traffic data:', error));
  }, []);

  const generateChartData = (logData) => {
    return {
      labels: logData.map(item => ''), // Dates for x-axis
      datasets: [
        {
          label: 'Requests per Day',
          data: logData.map(item => item.requests),
          backgroundColor: '#007FFF',
        },
      ],
    };
  };

  const chartOptions = {
    scales: {
      x: {
        display: false, // Show x-axis labels (dates)
      },
      y: {
        display: false, // Show y-axis labels (requests)
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    layout: {
      padding: 10,
    },
  };

  return (
    <Box sx={{ backgroundColor: 'black', padding: 4, borderRadius: 2 }}>
      {/* Iterate over each log and create a bar chart */}
      {Object.keys(trafficData).map((logKey, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Bar data={generateChartData(trafficData[logKey])} options={chartOptions} />
        </Box>
      ))}
    </Box>
  );
};

export default CustomChartComponent;


