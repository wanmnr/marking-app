// Backend - /backend/routes/auth.js

const express = require('express'); // Import Express.js
const router = express.Router(); // Create a new router object
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
const User = require('../models/User'); // Import the User model

// API: Route for user registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create payload and sign token
    const payload = { user: { id: user.id } };

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ msg: 'Server configuration error' });
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Error generating JWT:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        // Set the token in HttpOnly cookie
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Secure flag for production
          sameSite: 'Strict',
        });

        res.status(200).json({ msg: 'Registration successful' });
      }
    );
  } catch (err) {
    console.error(err.message);
      console.error('Error in /register route:', err); // Log the error

    // Check for specific error types
    if (err.name === 'MongoError' && err.code === 11000) {
      // Unique constraint violation
      return res.status(400).json({ error: 'Username already exists' });
    } else if (err.name === 'ValidationError') {
      // Mongoose validation errors
      const errors = Object.values(err.errors).map((err) => err.message);
      return res.status(400).json({ msg: `Validation Error: ${validationErrors.join(', ')}` });
    } else {
      // Handle other errors
      console.log('Error in /register route: Unknown Error');
      return res.status(500).json({ error: 'Server error' });
    }
  }
});


// API: Route for user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ msg: 'Server configuration error' });
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Secret key should be in environment variables
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) {
          console.error('Error generating JWT:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        // Set the token in HttpOnly cookie
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Secure flag for production
          sameSite: 'Strict', // CSRF protection
        });

        // You can still send a response body, but without the token
        res.status(200).json({ msg: 'Login successful' });
      }
    );
  } catch (err) {
    console.error('Error in /login route:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// API: Route for user logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ msg: 'Logout successful' });
});

module.exports = router; // Export the router
