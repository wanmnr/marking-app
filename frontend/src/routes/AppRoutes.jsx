// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Welcome';
import Sheet from '../pages/Sheet';
// import SubjectManagement from './pages/SubjectManagement';
// import ExportResults from './pages/ExportResults';
// import Settings from './pages/Settings';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={
        <PublicRoute>
            <Login />
        </PublicRoute>
    } />
    <Route path="/signup" element={
        <PublicRoute>
            <SignUp />
        </PublicRoute>
    } />
    <Route path="/" element={<Layout />}>
      <Route index element={
        <PrivateRoute>
            <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/sheet" element={
        <PrivateRoute>
            <Sheet />
        </PrivateRoute>
      } />
      {/* <Route path="subjects" element={
          <PrivateRoute>
            <SubjectManagement />
            </PrivateRoute>
          } />
        <Route path="export" element={
          <PrivateRoute>
            <ExportResults />
          </PrivateRoute>
        } />
        <Route path="settings" element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        } /> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
