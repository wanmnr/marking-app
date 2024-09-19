// src/hooks/useSheetContext.js
import { useContext } from 'react';
import { SheetContext } from '../contexts/SheetContext';

/**
 * useSheetState - A specialized hook to access only the state data (sheets, loading, error).
 * @returns {Object} Context values for sheets, loading status, and error state.
 */
export const useSheetState = () => {
  const { sheets, loading, error } = useSheetContext();
  return { sheets, loading, error };
};
