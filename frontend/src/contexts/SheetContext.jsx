// frontend/src/context/SheetContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import sheetService from '../services/SheetService';

/**
 * SheetContext - Provides sheet-related data and actions throughout the component tree.
 */
const SheetContext = createContext();

/**
 * SheetProvider - Wraps the app and provides sheet data and actions via context.
 * @param {Object} children - The wrapped components.
 * @returns {JSX.Element} The provider for SheetContext.
 */
export const SheetProvider = ({ children }) => {
  const [sheets, setSheets] = useState([]); // State to store fetched sheets
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to handle any errors

  /**
   * Fetches all sheets from the server and updates state.
   */
  const fetchSheets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedSheets = await sheetService.getSheets();
      setSheets(fetchedSheets);
    } catch (err) {
      setError(err.message || 'Error fetching sheets');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Uploads a new sheet file to the server.
   * @param {FormData} formData - The form data containing the sheet file.
   * @returns {Promise<void>} Result of the upload operation.
   */
  const uploadSheet = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await sheetService.uploadSheet(formData);
      await fetchSheets(); // Refresh sheet list after successful upload
    } catch (err) {
      setError(err.message || 'Error uploading sheet');
    } finally {
      setLoading(false);
    }
  }, [fetchSheets]);

  /**
   * Extracts data from an uploaded sheet using the appropriate method.
   * @param {File} file - The file to be processed.
   * @returns {Promise<Object>} The extracted sheet data.
   */
  const extractSheetData = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      if (!sheetService.validateFile(file)) {
        throw new Error('Unsupported file format');
      }
      const extractedData = await sheetService.extractSheetData(file);
      return sheetService.formatSheetModel(extractedData);
    } catch (err) {
      setError(err.message || 'Error extracting sheet data');
      throw err; // Re-throw to let the caller handle this error as well
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SheetContext.Provider value={{ sheets, fetchSheets, uploadSheet, extractSheetData, loading, error }}>
      {children}
    </SheetContext.Provider>
  );
};

/**
 * useSheetContext - A hook to access sheet data and actions from the context.
 * @returns {Object} Context values, including sheets, actions, and loading/error states.
 */
export const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useSheetContext must be used within a SheetProvider');
  }
  return context;
};

/**
 * useSheetActions - A specialized hook to access only sheet-related actions from the context.
 * @returns {Object} Context values for actions like uploadSheet, extractSheetData, and fetchSheets.
 */
export const useSheetActions = () => {
  const { fetchSheets, uploadSheet, extractSheetData } = useSheetContext();
  return { fetchSheets, uploadSheet, extractSheetData };
};

/**
 * useSheetState - A specialized hook to access only the state data (sheets, loading, error).
 * @returns {Object} Context values for sheets, loading status, and error state.
 */
export const useSheetState = () => {
  const { sheets, loading, error } = useSheetContext();
  return { sheets, loading, error };
};
