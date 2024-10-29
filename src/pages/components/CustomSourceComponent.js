import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const CustomSourceComponent = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/array');
      const data = await response.json();

      const serviceMap = new Map(); // To hold master nodes
      const traceIDtoServiceMap = new Map(); // Map traceIDs to service names
      const directLinks = new Set(); // To hold unique links

      // Step 1: Register master nodes and map traceIDs to service names
      data.forEach(item => {
        const { traceID, serviceName } = item;

        // Register master nodes in serviceMap
        if (!serviceMap.has(serviceName)) {
          serviceMap.set(serviceName, {
            traceIDs: [],
            x: Math.random() * 100,
            y: Math.random() * 100,
          });
        }

        // Map traceID to serviceName
        traceIDtoServiceMap.set(traceID, serviceName);
        
        // Add traceID to the master node's traceIDs
        serviceMap.get(serviceName).traceIDs.push(traceID);
      });

      // Step 2: Create links between master nodes based on 'from' and 'to' relationships
      data.forEach(item => {
        const { serviceName, from, to } = item;

        // Link to master nodes from 'from' traceIDs
        from.forEach(sourceTraceID => {
          const sourceService = traceIDtoServiceMap.get(sourceTraceID);
          // Create a link only if sourceService exists and is not the same as the current serviceName
          if (sourceService && sourceService !== serviceName) {
            directLinks.add(JSON.stringify({ source: sourceService, target: serviceName }));
          }
        });

        // Link from master nodes to 'to' traceIDs
        to.forEach(targetTraceID => {
          const targetService = traceIDtoServiceMap.get(targetTraceID);
          // Create a link only if targetService exists and is not the same as the current serviceName
          if (targetService && targetService !== serviceName) {
            directLinks.add(JSON.stringify({ source: serviceName, target: targetService }));
          }
        });
      });

      // Step 3: Prepare nodes and links for graph rendering
      const nodes = Array.from(serviceMap.entries()).map(([key, value]) => ({
        id: key,
        label: key,
        x: value.x,
        y: value.y,
        traceIDs: value.traceIDs,
      }));

      // Convert directLinks Set to an array of link objects
      const links = Array.from(directLinks).map(link => JSON.parse(link));

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
          const label = node.label;
          const radius = 6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = "#8884d8";
          ctx.fill();
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#8884d8';
          ctx.fillText(label, node.x, node.y - 15);
        }}
      />
    </div>
  );
};

export default CustomSourceComponent;
