// utils/logger.js

const fs = require('fs');
const path = require('path');

/**
 * Logger module for handling application-wide logging functionality.
 * Provides methods for logging different levels (info, warn, error, debug)
 * and writes logs to both console and daily rotating files.
 */

/**
 * Logger class that handles both console and file logging.
 */
class Logger {
  /**
   * Initialize the logger with the log directory path.
   */
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.ensureLogDirectoryExists();
  }

  /**
   * Creates the log directory if it doesn't exist.
   *
   * @returns {void}
   */
  ensureLogDirectoryExists() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Gets the current timestamp in ISO format.
   *
   * @returns {string} The current timestamp.
   */
  getCurrentTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Generates the log file path based on the current date.
   *
   * @returns {string} The full path to the log file.
   */
  getLogFilePath() {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `${date}.log`);
  }

  /**
   * Core logging function that handles both console and file logging.
   *
   * @param {string} level - The log level (INFO, WARN, ERROR, DEBUG).
   * @param {string} message - The message to be logged.
   * @param {Object} [meta={}] - Additional metadata to be included in the log entry.
   * @returns {void}
   */
  log(level, message, meta = {}) {
    const timestamp = this.getCurrentTimestamp();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta,
    };

    const logString = JSON.stringify(logEntry);

    console.log(logString); // Log to console

    // Log to file
    fs.appendFile(this.getLogFilePath(), logString + '\n', (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }

  /**
   * Logs an info level message.
   *
   * @param {string} message - The message to be logged.
   * @param {Object} [meta] - Additional metadata to be included.
   * @returns {void}
   */
  info(message, meta) {
    this.log('INFO', message, meta);
  }

  /**
   * Logs a warning level message.
   *
   * @param {string} message - The message to be logged.
   * @param {Object} [meta] - Additional metadata to be included.
   * @returns {void}
   */
  warn(message, meta) {
    this.log('WARN', message, meta);
  }

  /**
   * Logs an error level message.
   *
   * @param {string} message - The message to be logged.
   * @param {Object} [meta] - Additional metadata to be included.
   * @returns {void}
   */
  error(message, meta) {
    this.log('ERROR', message, meta);
  }

  /**
   * Logs a debug level message. Only logs in non-production environments.
   *
   * @param {string} message - The message to be logged.
   * @param {Object} [meta] - Additional metadata to be included.
   * @returns {void}
   */
  debug(message, meta) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('DEBUG', message, meta);
    }
  }
}

module.exports = new Logger();
