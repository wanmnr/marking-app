// Frontend - /frontend/src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/AuthService';

const PrivateRoute = () => {
  const isAuthenticated = AuthService.isAuthenticated(); // Check if the user is authenticated
  console.log("Is Authenticated:", isAuthenticated);

  return isAuthenticated ? (
    <Outlet /> // Render the child components if authenticated
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if not authenticated
  );
};


export default PrivateRoute;
