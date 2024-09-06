// Backend - /backend/routes/sheets.js

const express = require('express'); // Import Express.js
const router = express.Router(); // Create a new router object
const Sheet = require('../models/Sheet'); // Import the Sheet model
const Subject = require('../models/Subject'); // Import the Subject model
const { check, validationResult } = require('express-validator'); // Import Express Validator for input validation
const authMiddleware = require('../middleware/checkAuth'); // Import custom authentication middleware
const multer = require('multer'); // Import Multer for handling file uploads
const fs = require('fs');
const path = require('path'); // Import Node.js path module for handling file paths
const { createDefaultSubject } = require('../utils/subjectUtils'); // Import the utility function

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads'); // Ensure path is relative to project root
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory if it doesn't exist
    }
    cb(null, uploadPath); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the file name format
  },
});

// File type validation - only allow PDF and images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only PDFs and images are allowed.'), false); // Reject the file
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }); // Initialize Multer with storage and file filter

// API: Route for uploading a new marking sheet
router.post(
  '/',
  [authMiddleware, upload.single('sheetFile')], // Apply authentication middleware and Multer for single file upload
  [
    check('title', 'Title is required').not().isEmpty(), // Validate that title is provided
    check('classGroup', 'Class group is required').not().isEmpty(), // Validate that class group is provided
    check('subject', 'Subject ID is required').not().isEmpty(), // Validate that subject ID is provided
    check('dueDate', 'Due date is required').not().isEmpty(), // Validate that due date is provided
  ],
  async (req, res) => {
    const errors = validationResult(req); // Get validation results
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
    }
    // Call the function to create a default subject if none exists
    await createDefaultSubject();
    
    const { title, classGroup, subject, dueDate } = req.body; // Extract fields from the request body
    const fileUrl = `/uploads/${req.file.filename}`; // Store file URL with the full path

    try {
      // Find the Subject by ID or name
      let subjectObj = await Subject.findById(subject);
      
      if (!subjectObj) {
        // If subject is not found by ID, try finding by name
        subjectObj = await Subject.findOne({ name: subject });
        
        if (!subjectObj) {
          return res.status(400).json({ msg: 'Subject not found' });
        }
      }

      const newSheet = new Sheet({
        title,
        classGroup,
        subject,
        dueDate,
        fileUrl,
      });

      const sheet = await newSheet.save(); // Save the new sheet to the database
      res.json(sheet); // Return the saved sheet data
    } catch (err) {
      console.error(err.message); // Log any errors
      res.status(500).send('Server Error'); // Return a server error response
    }
  }
);

// API: Route for getting all marking sheets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sheets = await Sheet.find().populate('subject'); // Find all sheets and populate the subject reference
    res.json(sheets); // Return the list of sheets
  } catch (err) {
    console.error(err.message); // Log any errors
    res.status(500).send('Server Error'); // Return a server error response
  }
});

// API: Route for updating the status and score of a marking sheet
router.put('/:id', authMiddleware, async (req, res) => {
  const { status, score } = req.body; // Extract status and score from the request body

  const sheetFields = {};
  if (status) sheetFields.status = status; // Update status if provided
  if (score || score === 0) sheetFields.score = score; // Update score if provided

  try {
    let sheet = await Sheet.findById(req.params.id); // Find the sheet by ID
    if (!sheet) {
      return res.status(404).json({ msg: 'Sheet not found' }); // Return error if sheet is not found
    }

    sheet = await Sheet.findByIdAndUpdate(
      req.params.id,
      { $set: sheetFields },
      { new: true } // Return the updated document
    );

    res.json(sheet); // Return the updated sheet data
  } catch (err) {
    console.error(err.message); // Log any errors
    res.status(500).send('Server Error'); // Return a server error response
  }
});

module.exports = router; // Export the router

