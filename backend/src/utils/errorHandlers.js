// utils/errorHandlers.js

const logger = require('./logger'); // Assume we have a logger utility

/**
 * Custom error class for application-specific errors
 */
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

/**
 * Handle MongoDB errors
 */
function handleMongoError(error, res) {
  if (error.code === 11000) {
    return res.status(400).json({ error: 'Duplicate key error' });
  }
  return defaultErrorHandler(error, res);
}

/**
 * Handle validation errors
 */
function handleValidationError(error, res) {
  const errors = Object.values(error.errors).map((err) => err.message);
  return res
    .status(400)
    .json({ error: `Validation Error: ${errors.join(', ')}` });
}

/**
 * Default error handler for unhandled error types
 */
function defaultErrorHandler(error, res) {
  return res.status(500).json({ error: 'Internal Server Error' });
}

/**
 * Error handlers for specific error types
 */
const errorTypeHandlers = {
  MongoError: handleMongoError,
  ValidationError: handleValidationError,
  // Add more error type handlers as needed
};

/**
 * Generic error handler
 * @param {Error} error - The error object
 * @param {Response} res - Express response object
 */
function handleError(error, res) {
  logger.error('Error:', { message: error.message, stack: error.stack });

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  // Handle specific error types
  const handler = errorTypeHandlers[error.name] || defaultErrorHandler;
  return handler(error, res);
}

module.exports = {
  handleError,
  CustomError,
};