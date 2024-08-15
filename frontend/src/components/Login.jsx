// Frontend - /frontend/src/components/Login.jsx

import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Login() {
  const [username, setUsername] = useState(''); // State for storing the username
  const [password, setPassword] = useState(''); // State for storing the password
  const [error, setError] = useState(''); // State for storing error messages
  const navigate = useNavigate(); // Hook for navigation

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    try {
      await AuthService.login(username, password); // Attempt to log in using the provided credentials
      navigate('/'); // Redirect to the dashboard on successful login
    } catch (err) {
      setError('Invalid Credentials'); // Set an error message if login fails
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>} {/* Display error message if present */}
      <form onSubmit={onSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
