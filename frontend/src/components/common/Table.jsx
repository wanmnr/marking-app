// frontend/src/components/common/Table.jsx
import React from 'react';

/**
 * Table - A reusable component for displaying tabular data.
 * Ensures accessibility through proper use of table markup, and supports dynamic headers and rows.
 * @param {Array} headers - Array of header names (strings) to display as the table's column headers.
 * @param {Array} data - Array of objects, where each object is a row, and each key represents a column.
 * @param {Function} renderRow - A function to map the data object to the table row cells.
 * @returns {JSX.Element} A styled and accessible table component.
 */
const Table = ({ headers, data, renderRow }) => {
  if (!data || data.length === 0) {
    return <div className="text-center mt-4">No data available.</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-2 text-xs font-medium text-gray-700 uppercase text-left"
                scope="col"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, index) => (
            <tr key={index} className="border-t">
              {renderRow(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
