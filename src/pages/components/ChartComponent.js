import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically registers the charts
import { Box } from '@mui/material';

const ChartComponent = () => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    // Fetch traffic data from the backend
    fetch('/api/traffic')
      .then(response => response.json())
      .then(data => setTrafficData(data.trafficData))
      .catch(error => console.error('Error fetching traffic data:', error));
  }, []);

  // Map traffic data to chart format
  const chartData = {
    labels: trafficData.map(item => ''), // No text labels
    datasets: [
      {
        label: 'Requests per Day',
        data: trafficData.map(item => item.requests),
        backgroundColor: '#007FFF',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        display: false, // Hide x-axis labels
      },
      y: {
        display: false, // Hide y-axis labels
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
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default ChartComponent;


