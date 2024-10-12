import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { Box, Typography } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml'; // HTML language uses xml
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register languages for syntax highlighter
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('html', html);

// Custom style for SyntaxHighlighter with modified background
const customStyle = {
  background: '#000000', // Set background color to black
};

// Define masonry data
const codeBlocks = [
  {
    title: 'JavaScript',
    language: 'javascript',
    code: "const x = 10;\nconsole.log(x);"
  },
  {
    title: 'JSON',
    language: 'json',
    code: '{\n  "name": "John",\n  "age": 30\n}'
  },
  {
    title: 'SQL',
    language: 'sql',
    code: `-- Create payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  payment_id VARCHAR(255) NOT NULL,
  amount INT NOT NULL,
  currency VARCHAR(3) NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  token VARCHAR(255),
  isAdmin BOOLEAN,
  created_at TIMESTAMP NOT NULL
);`
  },
  {
    title: 'HTML',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`
  },
  {
    title: 'JavaScript',
    language: 'javascript',
    code: `
  devServer: {
    port: '5000',
    host: '0.0.0.0', // Listen on all interfaces (localhost, network IP, etc.)
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    hot: true,
    liveReload: true,
    allowedHosts: ['localhost', '.freemyip.com'], // Allow requests from localhost and DDNS
            `
  },
  {
    title: 'JavaScript',
    language: 'javascript',
    code: `
      {
        test: /\.svg$/, // Rule for SVG files
        use: [
          '@svgr/webpack',
          'url-loader', // Added url-loader
        ],
      },            
            `
  },
  {
    title: 'JSON',
    language: 'json',
    code: `
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server .",
    "build": "webpack .",
    "serve": "nohup npm start > /dev/null 2>&1 &",
    "make": "nohup npm start > server.log 2>&1 &"
  },
            `
  },
  {
    title: 'JavaScript',
    language: 'javascript',
    code: `
  Promise.all(logProcessingPromises)
    .then(() => {
      // Convert trafficData into the desired format
      const responseData = Object.keys(trafficData).reduce((acc, logKey) => {
        acc[logKey] = Object.entries(trafficData[logKey]).map(([date, requests]) => ({
          date,
          requests,
        }));
        return acc;
      }, {});

      res.json({ trafficData: responseData });
    })
    .catch((error) => {
      console.error('Error processing logs:', error);
      res.status(500).json({ error: 'Failed to process log files' });
    });
            `
  },
];

const CustomMasonryComponent = ({ searchQuery }) => {
  // Filter codeBlocks based on the searchQuery
  const filteredBlocks = codeBlocks.filter((block) => 
    block.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    block.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Masonry columns={{ xs: 2, sm: 2, md: 2 }} spacing={1}>
      {filteredBlocks.map((block, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: 'black',
            border: '1px solid gray',
            borderRadius: '20px',
            padding: '16px',
            maxWidth: '100%', 
            width: '100%', 
            boxSizing: 'border-box',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            overflowX: 'hidden',
            overflowWrap: 'break-word',
          }}
        >
          <Typography variant="h6" sx={{ color: '#007FFF' }}>
            {block.title}
          </Typography>
          <SyntaxHighlighter
            language={block.language}
            style={vs2015}
            customStyle={customStyle}
          >
            {block.code}
          </SyntaxHighlighter>
        </Box>
      ))}
    </Masonry>
  );
};

export default CustomMasonryComponent;
