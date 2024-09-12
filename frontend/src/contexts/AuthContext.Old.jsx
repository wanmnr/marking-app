import { createContext, useState, useContext } from 'react';
import isAuthenticated from '../services/auth/isAuthenticated';
import getToken from '../services/auth/getToken';
import userLogin from '../services/auth/userLogin';
import userLogout from '../services/auth/userLogout';
import userSignUp from '../services/auth/userSignUp'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: isAuthenticated(),
    token: getToken(),
  });

  

  const login = async (username, password) => {
    try {
      const { token } = await userLogin(username, password); // Extract token from response
      setAuthState({
        isAuthenticated: true,
        token,
      });
    } catch (err) {
      console.error('Login failed:', err.message); // Handle login error
      throw new Error(err.message); // Re-throw the error to handle it in UI
    }
  };

  const logout = () => {
    userLogout();
    setAuthState({
      isAuthenticated: false,
      token: null,
    });
  };

  const signUp = async (username, password) => {
    try {
      await userSignUp(username, password); 
    } catch (err) {
      throw new Error(err.message); 
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}