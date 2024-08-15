// Backend - /backend/models/Sheet.js

const mongoose = require('mongoose'); // Import Mongoose

// Define the schema for a Marking Sheet
const SheetSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the marking sheet
  classGroup: { type: String, required: true }, // Class group associated with the sheet
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  }, // Reference to the Subject model
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Completed'],
    default: 'New',
  }, // Status of the marking process
  score: { type: Number, default: 0 }, // Score obtained
  dueDate: { type: Date, required: true }, // Due date for completing the marking
  fileUrl: { type: String, required: true }, // URL of the uploaded file (PDF)
  uploadedAt: { type: Date, default: Date.now }, // Timestamp when the sheet was uploaded
});

// Export the Sheet model based on the SheetSchema
module.exports = mongoose.model('Sheet', SheetSchema);
