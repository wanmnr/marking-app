
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import userLogin from '../services/auth/userLogin';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      const { user, isAuth } = await userLogin(formData.username, formData.password);
      login(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <LoginForm onSubmit={handleLogin} />
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
}

export default Login;
