// Frontend - /frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AppProviders from './contexts/AppProviders';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppProviders>
          <Router>
            <App />
          </Router>
        </AppProviders>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
