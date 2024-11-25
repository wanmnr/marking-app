// backend/src/api/services/authService.js

/**
 * Authentication service module handling user registration and login.
 * Provides functionality for user creation, authentication, and JWT token generation.
 *
 * @module authService
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { CustomError } = require('../../utils/errorHandlers');
const logger = require('../../utils/logger');

/**
 * Register a new user in the system.
 *
 * @param {string} username - User's chosen username
 * @param {string} email - User's email address
 * @param {string} password - User's password (will be hashed)
 * @returns {Promise<Object>} Object containing JWT token
 * @throws {CustomError} If registration fails or user already exists
 */
exports.registerUser = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new CustomError('User already exists', 400);
    }

    const user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return { token: generateToken(user.id) };
  } catch (error) {
    logger.error('Error in user registration', {
      username,
      email,
      error: error.message,
    });
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Registration failed', 500);
  }
};

/**
 * Authenticate existing user and generate JWT token.
 *
 * @param {string} username - Username to authenticate
 * @param {string} password - Password to verify
 * @returns {Promise<Object>} Object containing JWT token
 * @throws {CustomError} If login fails or credentials are invalid
 */
exports.loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError('Invalid credentials', 401);
    }

    return { token: generateToken(user.id) };
  } catch (error) {
    logger.error('Error in user login', { username, error: error.message });
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Login failed', 500);
  }
};

/**
 * Generate JWT token for authenticated user.
 * Uses environment variable JWT_SECRET for token signing.
 *
 * @param {string} userId - ID of the authenticated user
 * @returns {string} Signed JWT token
 * @throws {CustomError} If token generation fails or JWT_SECRET is not configured
 */
function generateToken(userId) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new CustomError('JWT configuration error', 500);
    }

    return jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  } catch (error) {
    logger.error('Error generating JWT token', {
      userId,
      error: error.message,
    });
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Token generation failed', 500);
  }
}
