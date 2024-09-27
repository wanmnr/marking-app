// /backend/src/api/models/Sheet.js
const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  classGroup: {
    type: String,
    required: [true, 'Class group is required'],
    trim: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Subject is required'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
  },
  sections: [{
    sectionId: Number,
    sectionName: String,
    questions: [{
      questionId: Number,
      questionText: String,
      maxScore: Number,
      score: { type: Number, default: null },
    }],
  }],
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Completed'],
    default: 'New',
  },
  score: {
    type: Number,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Sheet', SheetSchema);