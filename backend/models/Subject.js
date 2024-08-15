// Backend - /backend/models/Subject.js

const mongoose = require('mongoose'); // Import Mongoose

// Define the schema for a Subject
const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the subject (unique)
  markingScheme: { type: Object, required: true }, // Marking scheme (customized per subject)
});

// Export the Subject model based on the SubjectSchema
module.exports = mongoose.model('Subject', SubjectSchema);
