// frontend/src/services/SheetService.js
import apiClient from './apiClient';
import { PDFDocument } from 'pdf-lib';  // For extracting text from PDFs
import Tesseract from 'tesseract.js';  // For OCR extraction from images (JPEG/PNG) and scanned PDFs

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
   * Extracts data from the uploaded sheet using pdf-lib or Tesseract.js based on file type.
   * @param {File} file - The sheet file to extract data from.
   * @returns {Promise<Object>} Extracted data in the form of SheetModel.
   * @throws {Error} If data extraction fails.
   */
  extractSheetData: async (file) => {
    try {
      const fileExtension = file.name.split('.').pop().toLowerCase();

      // Use Tesseract.js for image formats and scanned PDFs (jpg, png)
      if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        return await sheetService.extractWithTesseract(file);
      }

      // Use pdf-lib for text-based PDF extraction
      if (fileExtension === 'pdf') {
        return await sheetService.extractWithPdfLib(file);
      }

      throw new Error('Unsupported file type');
    } catch (error) {
      throw new Error('Failed to extract data from sheet');
    }
  },

  /**
   * Uses pdf-lib to extract text from structured PDFs.
   * Suitable for PDFs with embedded text, such as digitally generated documents.
   * @param {File} file - The PDF file to extract from.
   * @returns {Promise<Object>} Extracted data.
   */
  extractWithPdfLib: async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();  // Convert the file into an array buffer
      const pdfDoc = await PDFDocument.load(arrayBuffer);  // Load the PDF document using pdf-lib
      const pages = pdfDoc.getPages();
      let extractedText = '';

      // Loop through each page and extract text content
      for (let page of pages) {
        extractedText += page.getTextContent();
      }

      // Parse the extracted text into structured data (custom logic based on your document)
      const extractedData = {
        sheetTitle: extractTitleFromText(extractedText),
        studentName: extractStudentNameFromText(extractedText),
        // Add more fields as needed
      };

      return extractedData;
    } catch (error) {
      throw new Error('Failed to extract text from PDF using pdf-lib');
    }
  },

  /**
   * Uses Tesseract.js to perform OCR on image files or scanned PDFs.
   * Suitable for JPG, PNG, and PDF files with scanned images or handwritten text.
   * @param {File} file - The image or scanned PDF file to extract from.
   * @returns {Promise<Object>} Extracted data.
   */
  extractWithTesseract: async (file) => {
    try {
      // Create a URL for the file to pass it to Tesseract
      const imageURL = URL.createObjectURL(file);

      // Use Tesseract to perform OCR
      const { data: { text } } = await Tesseract.recognize(imageURL, 'eng', {
        logger: (m) => console.log(m),  // Optional logger to monitor progress
      });

      // Cleanup URL object after extraction
      URL.revokeObjectURL(imageURL);

      // Parse the OCR result into structured data (custom logic based on your document)
      const extractedData = {
        sheetTitle: extractTitleFromText(text),
        studentName: extractStudentNameFromText(text),
        // Add more fields as needed
      };

      return extractedData;
    } catch (error) {
      throw new Error('Failed to extract text using OCR from image');
    }
  },

  /**
   * Validates the uploaded file to ensure it meets format requirements.
   * @param {File} file - The file to validate.
   * @returns {boolean} Whether the file is valid.
   */
  validateFile: (file) => {
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];  // Allowed formats
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  },

  /**
   * Processes and formats the extracted data into a structured SheetModel.
   * @param {Object} extractedData - Data extracted from the sheet.
   * @returns {SheetModel} Formatted SheetModel object.
   */
  formatSheetModel: (extractedData) => {
    const sheetModel = {
      sheetId: extractedData.sheetId || null,
      subjectId: extractedData.subjectId || null,
      sheetTitle: extractedData.sheetTitle || 'Unknown Title',
      studentName: extractedData.studentName || 'Unknown Student',
      studentMatrixNumber: extractedData.studentMatrixNumber || 'Unknown Matrix Number',
      classId: extractedData.classId || null,
      sections: extractedData.sections || [],
    };
    return sheetModel;
  },
};

/**
 * Helper function to extract the title from text (can be customized based on specific format).
 * @param {string} text - The raw extracted text.
 * @returns {string} Extracted sheet title.
 */
const extractTitleFromText = (text) => {
  // Example: Logic to extract title from the text content
  const titleRegex = /Exam\s*Title:\s*(.+)/i;
  const match = text.match(titleRegex);
  return match ? match[1] : 'Unknown Title';
};

/**
 * Helper function to extract the student name from text.
 * @param {string} text - The raw extracted text.
 * @returns {string} Extracted student name.
 */
const extractStudentNameFromText = (text) => {
  const studentNameRegex = /Student\s*Name:\s*(.+)/i;
  const match = text.match(studentNameRegex);
  return match ? match[1] : 'Unknown Student';
};

export default sheetService;
