// Backend - /backend/routes/export.js

const express = require('express'); // Import Express.js
const router = express.Router(); // Create a new router object
const Sheet = require('../models/Sheet'); // Import the Sheet model
const authMiddleware = require('../middleware/checkAuth'); // Import custom authentication middleware
const json2csv = require('json2csv').parse; // Import json2csv for converting JSON data to CSV
const ExcelJS = require('exceljs'); // Import ExcelJS for generating Excel files
const PDFDocument = require('pdfkit'); // Import PDFKit for generating PDF files

// API: Route for exporting sheets data as CSV
router.get('/csv', authMiddleware, async (req, res) => {
  try {
    const sheets = await Sheet.find().populate('subject'); // Find all sheets and populate the subject reference
    const fields = [
      'title',
      'classGroup',
      'subject.name',
      'status',
      'score',
      'dueDate',
    ]; // Define the fields for the CSV
    const csv = json2csv(sheets, { fields }); // Convert the sheets data to CSV format

    res.header('Content-Type', 'text/csv'); // Set the content type to CSV
    res.attachment('sheets.csv'); // Set the filename for the CSV download
    return res.send(csv); // Send the CSV data
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).send('Server Error'); // Return a server error response
  }
});

// API: Route for exporting sheets data as Excel
router.get('/excel', authMiddleware, async (req, res) => {
  try {
    const sheets = await Sheet.find().populate('subject'); // Find all sheets and populate the subject reference
    const workbook = new ExcelJS.Workbook(); // Create a new Excel workbook
    const worksheet = workbook.addWorksheet('Sheets'); // Add a worksheet to the workbook

    worksheet.columns = [
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Class Group', key: 'classGroup', width: 20 },
      { header: 'Subject', key: 'subject', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Score', key: 'score', width: 10 },
      { header: 'Due Date', key: 'dueDate', width: 20 },
    ]; // Define the columns for the worksheet

    sheets.forEach((sheet) => {
      worksheet.addRow({
        title: sheet.title,
        classGroup: sheet.classGroup,
        subject: sheet.subject.name,
        status: sheet.status,
        score: sheet.score,
        dueDate: sheet.dueDate.toISOString().split('T')[0],
      }); // Add each sheet's data as a row in the worksheet
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ); // Set the content type to Excel
    res.setHeader('Content-Disposition', 'attachment; filename=sheets.xlsx'); // Set the filename for the Excel download

    await workbook.xlsx.write(res); // Write the workbook to the response
    res.end(); // End the response
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).send('Server Error'); // Return a server error response
  }
});

// API: Route for exporting sheets data as PDF
router.get('/pdf', authMiddleware, async (req, res) => {
  try {
    const sheets = await Sheet.find().populate('subject'); // Find all sheets and populate the subject reference
    const doc = new PDFDocument(); // Create a new PDF document

    res.setHeader('Content-Type', 'application/pdf'); // Set the content type to PDF
    res.setHeader('Content-Disposition', 'attachment; filename=sheets.pdf'); // Set the filename for the PDF download

    doc.pipe(res); // Pipe the PDF document to the response

    doc.fontSize(20).text('Sheets Data', { align: 'center' }); // Add a title to the PDF
    doc.moveDown(); // Add some space

    sheets.forEach((sheet) => {
      doc.fontSize(12).text(`Title: ${sheet.title}`);
      doc.text(`Class Group: ${sheet.classGroup}`);
      doc.text(`Subject: ${sheet.subject.name}`);
      doc.text(`Status: ${sheet.status}`);
      doc.text(`Score: ${sheet.score}`);
      doc.text(`Due Date: ${sheet.dueDate.toISOString().split('T')[0]}`);
      doc.moveDown(); // Add space between each sheet's data
    });

    doc.end(); // Finalize the PDF and send it
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).send('Server Error'); // Return a server error response
  }
});

module.exports = router; // Export the router
