// Frontend - /frontend/src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import routing components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import UploadSheet from './components/UploadSheet';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> {/* Route for the login page */}
      <Route path="/register" element={<Register />} /> {/* Route for the registration page */}
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} /> {/* Nested protected route for the dashboard */}
        <Route path="/upload" element={<UploadSheet />}/>
      </Route>
    </Routes>
  );
}

export default App; // Export the App component as the default export
