// src/hooks/useSheetContext.js
import { useContext } from 'react';
import { SheetContext } from '../contexts/SheetContext';

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
