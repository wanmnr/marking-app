// /backend/src/api/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { CustomError } = require('../../utils/errorHandlers');
const logger = require('../../utils/logger');

module.exports = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    logger.warn('Authorization attempt without token', {
      ip: req.ip,
      path: req.path,
    });
    throw new CustomError('No token, authorization denied', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    logger.info('User authenticated', { userId: req.user.id, path: req.path });
    next();
  } catch (err) {
    logger.error('Invalid token', {
      error: err.message,
      ip: req.ip,
      path: req.path,
    });
    throw new CustomError('Token is not valid', 401);
  }
};
