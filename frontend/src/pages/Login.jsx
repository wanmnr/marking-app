// src/pages/Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/common/Form';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const loginFields = [
    { name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'Enter your username' },
    { name: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Enter your password' },
  ];

  const handleLogin = async (formData) => {
    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err) {
      // Error is already handled in the AuthContext
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h1>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        <Form fields={loginFields} submitLabel="Login" onSubmit={handleLogin} validate={validate} />
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


