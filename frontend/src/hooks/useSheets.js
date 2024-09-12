import { useContext } from 'react';
import { SheetContext } from '../contexts/SheetContext';

// Custom hook to access sheet-related actions and state
export function useSheets() {
  return useContext(SheetContext); // Retrieve sheet-related actions and state from the context
}
