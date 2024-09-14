// src/contexts/AppProviders.jsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { SheetProvider } from './SheetContext';

const AppProviders = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <SheetProvider>
        {children}
      </SheetProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default AppProviders;