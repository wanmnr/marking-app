// /backend/src/api/routes/sheets.js
const express = require('express');
const router = express.Router();
const sheetsController = require('../controller/sheetsController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const validateSheet = require('../validators/sheetValidator');

router.post('/', authMiddleware, uploadMiddleware.single('sheetFile'), validateSheet, sheetsController.createSheet);
router.get('/', authMiddleware, sheetsController.getAllSheets);
router.put('/:id', authMiddleware, sheetsController.updateSheet);
router.delete('/:id', authMiddleware, sheetsController.deleteSheet);
router.get('/download/:id', authMiddleware, sheetsController.downloadSheet);

module.exports = router;