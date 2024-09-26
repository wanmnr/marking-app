// utils/logger.js

const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.ensureLogDirectoryExists();
  }

  ensureLogDirectoryExists() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getCurrentTimestamp() {
    return new Date().toISOString();
  }

  getLogFilePath() {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `${date}.log`);
  }

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

  info(message, meta) {
    this.log('INFO', message, meta);
  }

  warn(message, meta) {
    this.log('WARN', message, meta);
  }

  error(message, meta) {
    this.log('ERROR', message, meta);
  }

  debug(message, meta) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('DEBUG', message, meta);
    }
  }
}

module.exports = new Logger();