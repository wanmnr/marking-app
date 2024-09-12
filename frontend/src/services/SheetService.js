// Frontend - /frontend/src/services/SheetService.js
import apiClient from './apiClient';

const sheetService = {
  /**
   * Fetches all sheets from the server.
   * @returns {Promise<Array>} List of sheets.
   * @throws {Error} If fetching fails.
   */
  getSheets: async () => {
    try {
      const response = await apiClient.get('/sheets/getAllSheets');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to fetch sheets');
    }
  },

  /**
   * Uploads a sheet file to the server.
   * @param {FormData} formData - The form data containing the sheet file.
   * @returns {Promise<Object>} Response data from the server.
   * @throws {Error} If uploading fails.
   */
  uploadSheet: async (formData) => {
    try {
      const response = await apiClient.post('/sheets/uploadSheet', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to upload sheet');
    }
  },

  /**
   * Extracts data from the uploaded sheet.
   * Uses external libraries like pdf.js to extract details such as
   * sheet title, student info, and sections.
   * @param {File} file - The sheet file to extract data from.
   * @returns {Promise<Object>} Extracted data in the form of SheetModel.
   * @throws {Error} If data extraction fails.
   */
  extractSheetData: async (file) => {
    try {
      // Example: using a hypothetical PDF extraction utility
      const extractedData = await pdfExtractionUtility.extract(file);
      return extractedData;
    } catch (error) {
      throw new Error('Failed to extract data from sheet');
    }
  },

  /**
   * Validates the uploaded file to ensure it meets format requirements.
   * @param {File} file - The file to validate.
   * @returns {boolean} Whether the file is valid.
   */
  validateFile: (file) => {
    const allowedExtensions = ['pdf', 'jpg', 'png']; // Allowed formats
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  },

  /**
   * Processes and formats the extracted data into a structured SheetModel.
   * @param {Object} extractedData - Data extracted from the sheet.
   * @returns {SheetModel} Formatted SheetModel object.
   */
  formatSheetModel: (extractedData) => {
    // Assuming extractedData contains relevant info
    const sheetModel = {
      sheetId: extractedData.sheetId,
      subjectId: extractedData.subjectId || null,
      sheetTitle: extractedData.sheetTitle,
      studentName: extractedData.studentName,
      studentMatrixNumber: extractedData.studentMatrixNumber,
      classId: extractedData.classId,
      sections: extractedData.sections || [],
    };
    return sheetModel;
  },
};

export default sheetService;
