import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    apiClient.get('/auth/me')
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    apiClient.post('/auth/logout')
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}