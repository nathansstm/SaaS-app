import React from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './src/App.js';
import './public/global.css';  // Import the global CSS
import './public/fonts.css';  // Import the fonts CSS

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MainApp />);

