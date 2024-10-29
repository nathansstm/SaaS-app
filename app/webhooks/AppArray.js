const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'http://localhost:16686/api';

// Function to get all service names
async function getServiceNames() {
  const response = await axios.get(`${BASE_URL}/services`);
  return response.data.data;
}

// Function to get trace data for a given service
async function getTraceData(serviceName) {
  const response = await axios.get(`${BASE_URL}/traces?service=${serviceName}`);
  return response.data.data;
}

// Function to build trace hierarchy with complete trace data
async function buildTraceHierarchy() {
  const services = await getServiceNames();
  const masterList = {};

  // Step 1: Gather all trace data across services
  for (const service of services) {
    const traces = await getTraceData(service);

    traces.forEach(trace => {
      const traceID = trace.traceID;
      if (!masterList[traceID]) {
        masterList[traceID] = {
          serviceName: service,
          to: [],
          from: []
        };
      }

      trace.spans.forEach(span => {
        const { traceID: spanTraceID, tags } = span;

        tags.forEach(tag => {
          // Check for 'to' tags and populate to array
          if (tag.key === 'to') {
            if (!masterList[traceID].to.includes(tag.value)) {
              masterList[traceID].to.push(tag.value);
            }
          }
          // Check for 'from' tags and populate from array
          if (tag.key === 'from') {
            if (!masterList[traceID].from.includes(tag.value)) {
              masterList[traceID].from.push(tag.value);
            }
          }
        });
      });
    });
  }

  // Step 2: Format the masterList for output
  return Object.keys(masterList).map(traceID => ({
    traceID,
    serviceName: masterList[traceID].serviceName,
    to: masterList[traceID].to,
    from: masterList[traceID].from
  }));
}

// Route to handle /array and return the organized trace data
router.get('/array', async (req, res) => {
  try {
    const hierarchy = await buildTraceHierarchy();
    res.status(200).json(hierarchy);
  } catch (error) {
    console.error('Error in /array route:', error);
    res.status(500).json({ message: 'Error handling /array route' });
  }
});

module.exports = router;
