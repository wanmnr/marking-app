// /backend/src/api/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { CustomError } = require('../../utils/errorHandlers');
const logger = require('../../utils/logger');

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
