// /backend/src/api/controllers/authController.js
const authService = require('../services/authService');
const { handleError } = require('../../utils/errorHandlers');

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

exports.logout = (req, res) => {
  clearTokenCookie(res);
  res.status(200).json({ msg: 'Logout successful' });
};

function setTokenCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
}

function clearTokenCookie(res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
}
