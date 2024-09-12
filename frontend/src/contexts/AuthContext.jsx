// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import userLogin from '../services/auth/userLogin';
import userLogout from '../services/auth/userLogout';
import userSignUp from '../services/auth/userSignUp';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token
      // This is a placeholder and should be replaced with actual API call
      setUser({ username: 'User', token });
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const data = await userLogin(username, password);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      setError(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await userLogout();
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('loggedUser'); // Add this line
      setError(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const signUp = useCallback(async (username, email, password) => {
    try {
      const data = await userSignUp({ username, email, password });
      setUser(data.loggedUser);
      localStorage.setItem('token', data.loggedUser.token);
      setError(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    signUp,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}