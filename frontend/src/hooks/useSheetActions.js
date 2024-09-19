// src/hooks/useSheetContext.js
import { useContext } from 'react';
import { SheetContext } from '../contexts/SheetContext';

/**
 * useSheetActions - A specialized hook to access only sheet-related actions from the context.
 * @returns {Object} Context values for actions like uploadSheet, extractSheetData, and fetchSheets.
 */
export const useSheetActions = () => {
  const { fetchSheets, uploadSheet, extractSheetData } = useSheetContext();
  return { fetchSheets, uploadSheet, extractSheetData };
};
