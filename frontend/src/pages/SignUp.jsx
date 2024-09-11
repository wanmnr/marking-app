import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import userSignUp from '../services/auth/userSignUp';
import { useAuth } from '../hooks/useAuth';

function SignUp() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async (formData) => {
    try {
      const loggedIn = await userSignUp(formData);
      login(loggedIn.loggedUser);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <SignUpForm onSubmit={handleSignUp} />
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default SignUp;
