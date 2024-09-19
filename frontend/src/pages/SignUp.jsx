// src/pages/SignUp.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/common/Form';
import { useAuth } from '../hooks/useAuth';

function SignUp() {
  const navigate = useNavigate();
  const { signUp, error } = useAuth();

  const signUpFields = [
    { name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'Choose a username' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email' },
    { name: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Choose a password' },
  ];

  const handleSignUp = async (formData) => {
    try {
      await signUp(formData.username, formData.email, formData.password);
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
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h1>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        <Form fields={signUpFields} submitLabel="Sign Up" onSubmit={handleSignUp} validate={validate} />
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;