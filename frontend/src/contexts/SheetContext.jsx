// src/contexts/SheetContext.js
import React, { createContext, useState, useCallback } from 'react';
import sheetService from '../services/SheetService';

// Create the SheetContext
export const SheetContext = createContext();

// SheetProvider component to wrap parts of the app
export function SheetProvider({ children }) {
  const [sheets, setSheets] = useState([]);

  // Fetch sheets from the backend
  const fetchSheets = useCallback(async () => {
    try {
      const fetchedSheets = await sheetService.getSheets();
      setSheets(fetchedSheets);
    } catch (error) {
      console.error('Error fetching sheets:', error);
    }
  }, []);

  // Upload a new sheet to the backend
  const uploadSheet = useCallback(async (formData) => {
    try {
      const newSheet = await sheetService.uploadSheet(formData);
      setSheets((prevSheets) => [...prevSheets, newSheet]);
      return newSheet;
    } catch (error) {
      console.error('Error uploading sheet:', error);
      throw error;
    }
  }, []);

  const value = {
    sheets,
    fetchSheets,
    uploadSheet,
  };

  return (
    <SheetContext.Provider value={value}>
      {children}
    </SheetContext.Provider>
  );
}