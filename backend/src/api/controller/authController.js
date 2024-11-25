// backend/src/api/controllers/authController.js

/**
 * Authentication controller module handling HTTP requests for user authentication.
 * Manages registration, login, and logout endpoints.
 *
 * @module authController
 */

const authService = require('../services/authService');
const { handleError } = require('../../utils/errorHandlers');

/**
 * Handle user registration request.
 * Extracts credentials from request body and calls authentication service.
 *
 * @param {Object} req - Express request object containing username, email and password
 * @param {Object} res - Express response object
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await authService.registerUser(username, email, password);
    setTokenCookie(res, result.token);
    res.status(200).json({ msg: 'Registration successful' });
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Handle user login request.
 * Validates credentials and generates authentication token.
 *
 * @param {Object} req - Express request object containing username and password
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.loginUser(username, password);
    setTokenCookie(res, result.token);
    res.status(200).json({ msg: 'Login successful' });
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Handle user logout request.
 * Clears authentication token cookie.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.logout = (req, res) => {
  clearTokenCookie(res);
  res.status(200).json({ msg: 'Logout successful' });
};

/**
 * Set secure HTTP-only cookie with JWT token.
 * Cookie security options vary based on environment.
 *
 * @param {Object} res - Express response object
 * @param {string} token - JWT token to be stored in cookie
 */
function setTokenCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
}

/**
 * Clear authentication token cookie.
 * Uses same security options as when setting cookie.
 *
 * @param {Object} res - Express response object
 */
function clearTokenCookie(res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
}
