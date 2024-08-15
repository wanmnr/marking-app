// Frontend - /frontend/src/components/Register.jsx

import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Register() {
  const [username, setUsername] = useState(''); // State for storing the username
  const [password, setPassword] = useState(''); // State for storing the password
  const [error, setError] = useState(''); // State for storing error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setError(''); // Clear previous errors

    try {
      await AuthService.register(username, password); // Attempt to register the user
      navigate('/login'); // Redirect to the login page on successful registration
    } catch (err) {
      setError(err.message); // Set an error message if registration fails
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p>{error}</p>} {/* Display error message if present */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;