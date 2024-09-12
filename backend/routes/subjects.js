// Backend - /backend/routes/subjects.js
const express = require('express'); // Import Express.js
const router = express.Router(); // Create a new router object
const Subject = require('../models/Subject'); // Import the Subject model
const { check, validationResult } = require('express-validator'); // Import Express Validator for input validation
const authMiddleware = require('../middleware/checkAuth'); // Import custom authentication middleware


// API: Route for creating a new subject
router.post(
  '/',
  [authMiddleware], // Apply authentication middleware
  [
    check('name', 'Name is required').not().isEmpty(), // Validate that name is provided
    check('markingScheme', 'Marking scheme is required').not().isEmpty(), // Validate that marking scheme is provided
  ],
  async (req, res) => {
    createDefaultSubject(); // Call the function when creating a new subject

    const errors = validationResult(req); // Get validation results
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
    }
    const { name, markingScheme } = req.body; // Extract fields from the request body

    try {
      let subject = await Subject.findOne({ name }); // Check if a subject with the given name already exists
      if (subject) {
        return res.status(400).json({ msg: 'Subject already exists' }); // Return error if subject already exists
      }

      subject = new Subject({
        name,
        markingScheme,
      });

      await subject.save(); // Save the new subject to the database
      res.json(subject); // Return the saved subject data
    } catch (err) {
      console.error(err.message); // Log any errors
      res.status(500).send('Server Error'); // Return a server error response
    }
  }
);

// API: Route for getting all subjects
router.get('/', authMiddleware, async (req, res) => {
  try {
    const subjects = await Subject.find(); // Find all subjects
    res.json(subjects); // Return the list of subjects
  } catch (err) {
    console.error(err.message); // Log any errors
    res.status(500).send('Server Error'); // Return a server error response
  }
});

module.exports = router; // Export the router
