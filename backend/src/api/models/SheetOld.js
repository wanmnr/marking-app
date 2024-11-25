const mongoose = require('mongoose'); // Import Mongoose

// Define the schema for a Marking Sheet
const SheetSchema = new mongoose.Schema({
  sheetTitle: { type: String, required: true }, // Title of the marking sheet
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  }, // Reference to the Subject model
  studentName: { type: String, required: true }, // Student name
  studentMatrixNumber: { type: String, required: true }, // Student Matrix Number
  classId: { type: Number, required: true }, // Class ID associated with the sheet
  sections: [
    {
      sectionId: { type: Number, required: true },
      sectionName: { type: String, required: true },
      questions: [
        {
          questionId: { type: Number, required: true },
          questionText: { type: String, required: true },
          maxScore: { type: Number, required: true },
          score: { type: Number, default: null }, // Initially null until marked
        },
      ],
    },
  ],
  fileUrl: { type: String, required: true }, // URL of the uploaded file (PDF)
  uploadedAt: { type: Date, default: Date.now }, // Timestamp when the sheet was uploaded
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Completed'],
    default: 'New',
  }, // Status of the marking process
});

// Export the Sheet model based on the SheetSchema
module.exports = mongoose.model('Sheet', SheetSchema);