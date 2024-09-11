// src/pages/Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleLogin = async (formData) => {
    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err) {
      // Error is already handled in the AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h1>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        <LoginForm onSubmit={handleLogin} />
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