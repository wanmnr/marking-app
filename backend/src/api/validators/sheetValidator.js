// /backend/src/api/validators/sheetValidator.js
const { body, validationResult } = require('express-validator');
const { CustomError } = require('../../utils/errorHandlers');

const validateSheet = [
  body('title').notEmpty().withMessage('Title is required'),
  body('classGroup').notEmpty().withMessage('Class group is required'),
  body('subject').notEmpty().withMessage('Subject ID is required'),
  body('dueDate').notEmpty().withMessage('Due date is required').isISO8601().withMessage('Invalid date format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Validation error', 400, errors.array());
    }
    next();
  },
];

module.exports = validateSheet;