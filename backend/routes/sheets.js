// Backend - /backend/routes/sheets.js
const express = require('express');
const router = express.Router(); 
const Sheet = require('../models/Sheet'); 
const Subject = require('../models/Subject'); 
const { check, validationResult } = require('express-validator'); 
const authMiddleware = require('../middleware/checkAuth'); 
const multer = require('multer'); 
const fs = require('fs');
const path = require('path'); 
const { createDefaultSubject } = require('../utils/subjectUtils'); 

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDFs and images are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

// API: Route for uploading a new marking sheet
router.post(
  '/',
  [authMiddleware, upload.single('sheetFile')],
  [
    check('title', 'Title is required').not().isEmpty(),
    check('classGroup', 'Class group is required').not().isEmpty(),
    check('subject', 'Subject ID is required').not().isEmpty(),
    check('dueDate', 'Due date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Extract request data
      const { title, classGroup, subject, dueDate } = req.body;
      const fileUrl = `/uploads/${req.file.filename}`;

      // Create a default subject if needed
      await createDefaultSubject();

      // Find the subject by ID or name
      let subjectObj = await Subject.findById(subject);
      if (!subjectObj) {
        subjectObj = await Subject.findOne({ name: subject });
        if (!subjectObj) {
          return res.status(400).json({ msg: 'Subject not found' });
        }
      }

      // Create a new sheet
      const newSheet = new Sheet({
        title,
        classGroup,
        subject: subjectObj._id,
        dueDate,
        fileUrl,
        sections: [], // Initialize sections array
      });

      const sheet = await newSheet.save();
      res.json(sheet);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// API: Route for getting all marking sheets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sheets = await Sheet.find().populate('subject');
    res.json(sheets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// API: Route for updating the status and score of a marking sheet
router.put('/:id', authMiddleware, async (req, res) => {
  const { status, score, sections } = req.body;

  try {
    let sheet = await Sheet.findById(req.params.id);
    if (!sheet) {
      return res.status(404).json({ msg: 'Sheet not found' });
    }

    // Update sheet fields if provided
    if (status) sheet.status = status;
    if (score || score === 0) sheet.score = score;
    if (sections) sheet.sections = sections;

    await sheet.save();
    res.json(sheet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// API: Route for deleting a sheet by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const sheet = await Sheet.findById(req.params.id);
    if (!sheet) {
      return res.status(404).json({ msg: 'Sheet not found' });
    }

    // Remove the sheet from the database
    await sheet.remove();
    res.json({ msg: 'Sheet removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// API: Route for downloading a sheet file by ID
router.get('/download/:id', authMiddleware, async (req, res) => {
  try {
    const sheet = await Sheet.findById(req.params.id);
    if (!sheet) {
      return res.status(404).json({ msg: 'Sheet not found' });
    }

    const filePath = path.join(__dirname, `../../uploads/${sheet.fileUrl.split('/uploads/')[1]}`);
    res.download(filePath);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
