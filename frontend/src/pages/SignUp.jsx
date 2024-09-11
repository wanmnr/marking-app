// src/pages/SignUp.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import { useAuth } from '../hooks/useAuth';

function SignUp() {
  const navigate = useNavigate();
  const { signUp, error } = useAuth();

  const handleSignUp = async (formData) => {
    try {
      await signUp(formData.username, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      // Error is already handled in the AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h1>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        <SignUpForm onSubmit={handleSignUp} />
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