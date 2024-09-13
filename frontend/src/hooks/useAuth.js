// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Custom hook to access authentication-related actions and state
export function useAuth() {
  return useContext(AuthContext);
}
