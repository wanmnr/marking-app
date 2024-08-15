// Frontend - /frontend/src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component
import './index.css'; // Import global CSS styles
import { BrowserRouter as Router } from 'react-router-dom'; // Import React Router for client-side routing

// Get the root DOM element where the React app will be mounted
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Render the App component within the Router to enable routing
root.render(
  <Router>
    <App />
  </Router>
);
