// Backend - /backend/routes/auth.js

const express = require('express'); // Import Express.js
const router = express.Router(); // Create a new router object
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication

const User = require('../models/User'); // Import the User model

// API: Route for user registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Extract username and password from the request body

  try {
    let user = await User.findOne({ username }); // Check if a user with the given username already exists
    if (user) {
      return res.status(400).json({ msg: 'User already exists' }); // Return error if user already exists
    }

    user = new User({ username, password }); // Create a new user instance

    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
    user.password = await bcrypt.hash(password, salt); // Hash the password

    try {
      await user.save();
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
        return res.status(400).json({ error: errors.join(', ') });
      } else {
        // Handle other errors
        console.log('Error in /register route: Unknown Error');
        return res.status(500).json({ error: 'Server error' });
      }
    }

    //     try {
    //       const payload = { user: { id: user.id } }; // Create a JWT payload
    //       const token = await jwt.sign(payload, 'secretToken', { expiresIn: 360000 });
    //       res.json({ token });
    //     } catch (err) {
    //       console.error('Error generating JWT:', err); // Log the JWT generation error
    //       res.status(500).json({ msg: 'Server error' }); // Return a server error response
    //     }

    //     jwt.sign(
    //       payload,
    //       'secretToken', // Secret key for signing the token (should be stored in environment variables)
    //       { expiresIn: 360000 }, // Token expiration time
    //       (err, token) => {
    //         if (err) throw err;
    //         res.json({ token }); // Return the generated token
    //       }
    //     );
    //   } catch (err) {
    //     console.error('Error in /register route:', err); // Log any errors
    //     res.status(500).json({ msg: 'Server error' }); // Return a server error response
    //   }
    // });

    const payload = { user: { id: user.id } }; // Create a JWT payload

    jwt.sign(
      payload,
      'secretToken', // Secret key for signing the token (should be stored in environment variables)
      { expiresIn: 360000 }, // Token expiration time
      (err, token) => {
        if (err) {
          console.error('Error generating JWT:', err); // Log the JWT generation error
          return res.status(500).json({ msg: 'Server error' }); // Return a server error response
        }
        res.json({ token }); // Return the generated token
      }
    );
  } catch (err) {
    console.error('Error in /register route:', err); // Log any errors
    res.status(500).json({ msg: 'Server error' }); // Return a server error response
  }
});

// API: Route for user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Extract username and password from the request body

  try {
    let user = await User.findOne({ username }); // Find the user by username
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' }); // Return error if user is not found
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' }); // Return error if password doesn't match
    }

    const payload = { user: { id: user.id } }; // Create a JWT payload

    jwt.sign(
      payload,
      'secretToken', // Secret key for signing the token (should be stored in environment variables)
      { expiresIn: 360000 }, // Token expiration time
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Return the generated token
      }
    );
  } catch (err) {
    console.error('Error in /login route:', err); // Log any errors
    res.status(500).json({ msg: 'Server error' }); // Return a server error response
  }
});

module.exports = router; // Export the router
