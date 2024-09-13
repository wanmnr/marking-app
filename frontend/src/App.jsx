// Frontend - /frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Welcome';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import UploadSheet from './pages/UploadSheet';
// import SubjectManagement from './pages/SubjectManagement';
// import ExportResults from './pages/ExportResults';
// import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path="/" element={<Layout />}>
        <Route index element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="upload" element={
          <PrivateRoute>
            <UploadSheet />
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
}

export default App;