// backend/src/api/routes/authRoutes.js

/**
 * Authentication routes module.
 * Defines API endpoints for user registration, login, and logout operations.
 * Routes are protected by authentication middleware where necessary.
 *
 * Available endpoints:
 * - POST /register - New user registration
 * - POST /login - User authentication
 * - POST /logout - User session termination
 *
 * @module authRoutes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

/**
 * Registration endpoint.
 * Accepts username, email, and password in request body.
 */
router.post('/register', authController.register);

/**
 * Login endpoint.
 * Accepts username and password in request body.
 */
router.post('/login', authController.login);

/**
 * Logout endpoint.
 * Clears authentication token cookie.
 */
router.post('/logout', authController.logout);

module.exports = router;
