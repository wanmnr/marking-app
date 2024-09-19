// frontend/src/pages/SheetPage.js
import React from 'react';
import { useSheetState } from '../contexts/SheetContext';
import Table from '../components/common/Table';

/**
 * SheetPage - Page component for uploading sheets and displaying them in a table.
 */
const SheetPage = () => {
  const { sheets, loading, error } = useSheetState(); // Access sheet state

  const headers = ['Sheet Title', 'Student Name', 'Matrix Number', 'Class ID'];

  const renderSheetRow = (sheet) => (
    <>
      <td className="px-6 py-2">{sheet.sheetTitle}</td>
      <td className="px-6 py-2">{sheet.studentName}</td>
      <td className="px-6 py-2">{sheet.studentMatrixNumber}</td>
      <td className="px-6 py-2">{sheet.classId}</td>
    </>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Error Handling */}
      {error && <div className="text-red-500 text-center my-4">{error}</div>}

      {/* Loading Spinner */}
      {loading && <div className="text-center my-4">Loading sheets...</div>}

      {/* Sheets Table */}
      <Table headers={headers} data={sheets} renderRow={renderSheetRow} />
    </div>
  );
};

export default SheetPage;
