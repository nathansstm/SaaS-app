import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const CustomMapComponent = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/array');
      const data = await response.json();

      // Create a map to associate each serviceName with its traceIDs and fixed coordinates
      const serviceMap = new Map();
      const links = [];

      data.forEach(item => {
        const { traceID, from, to, serviceName } = item;

        // Initialize master service node with fixed coordinates if it doesn't exist
        if (!serviceMap.has(serviceName)) {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          serviceMap.set(serviceName, { traceIDs: [], x, y, isMaster: true });
        }

        // Add traceID to the service's list
        serviceMap.get(serviceName).traceIDs.push(traceID);

        // Create links based on from and to values, using serviceName as identifier
        from.forEach(sourceService => {
          if (!serviceMap.has(sourceService)) {
            serviceMap.set(sourceService, { traceIDs: [], x: Math.random() * 100, y: Math.random() * 100, isMaster: true });
          }
          links.push({
            source: sourceService,
            target: serviceName,
            isForward: true
          });
        });

        to.forEach(targetService => {
          if (!serviceMap.has(targetService)) {
            serviceMap.set(targetService, { traceIDs: [], x: Math.random() * 100, y: Math.random() * 100, isMaster: true });
          }
          links.push({
            source: serviceName,
            target: targetService,
            isForward: false
          });
        });
      });

      // Convert serviceMap to nodes array, placing trace nodes at the master node coordinates
      const nodes = [];
      serviceMap.forEach((value, key) => {
        // Push the master node
        nodes.push({
          id: key,          // Use serviceName as id
          label: key,       // Display serviceName as label
          x: value.x,
          y: value.y,
          isMaster: value.isMaster, // True for master nodes
          traceIDs: value.traceIDs  // Store traceIDs
        });

        // Add separate nodes for each traceID at the same coordinates as the master node
        value.traceIDs.forEach(traceID => {
          nodes.push({
            id: traceID,
            label: key,      // Label trace nodes with serviceName for consistency
            x: value.x,      // Same x as master node
            y: value.y,      // Same y as master node
            isMaster: false  // Trace nodes are not master nodes
          });
        });
      });

      setGraphData({ nodes, links });
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeColor="#8884d8"
        nodeRelSize={6}
        linkColor={() => "#8884d8"}
        linkOpacity={0.3}
        d3Force={{
          charge: -400,
          link: { distance: 100 }
        }}
        enableNodeDrag={false}
        enableZoom={false}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label; // Use serviceName consistently as label
          const radius = 6; // Node size (equivalent to nodeRelSize)
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = "#8884d8"; // Node color
          ctx.fill();
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#8884d8';
          ctx.fillText(label, node.x, node.y - 15); // Position label above node
        }}
      />
    </div>
  );
};

export default CustomMapComponent;
