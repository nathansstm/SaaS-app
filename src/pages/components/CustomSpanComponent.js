import React, { useMemo } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const CustomSpanComponent = () => {
  // Generate graph data
  const graphData = useMemo(() => {
    // Create 8 nodes
    const nodes = Array.from({ length: 8 }, (_, i) => ({
      id: `node-${i}`,
      // Add some randomness to initial positions
      x: Math.cos(2 * Math.PI * i / 8) * 100 + (Math.random() - 0.5) * 20,
      y: Math.sin(2 * Math.PI * i / 8) * 100 + (Math.random() - 0.5) * 20
    }));

    // Create bidirectional links between all nodes
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (i !== j) {
          // Forward trace
          links.push({
            source: nodes[i].id,
            target: nodes[j].id,
            isForward: true
          });
          // Backward trace
          links.push({
            source: nodes[i].id,
            target: nodes[j].id,
            isForward: false
          });
        }
      }
    }

    return { nodes, links };
  }, []);

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeColor="#8884d8"
        nodeRelSize={6}
        linkColor={() => "#8884d8"}
        linkOpacity={0.3}
        linkCurvature={0.2}
        linkCurveRotation={(link) => link.isForward ? 30 : -30}
        d3Force={{
          // Adjust these values to control the layout
          charge: -400,
          link: { distance: 100 }
        }}
        enableNodeDrag={false}
        enableZoom={false}
      />
    </div>
  );
};

export default CustomSpanComponent;
