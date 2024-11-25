// backend/src/utils/subjectUtils.js

const Subject = require('../api/models/Subject'); // Import the Subject model

// Function to create the default subject if none exists
async function createDefaultSubject() {
  const defaultSubject = {
    name: 'Default Subject',
    markingScheme: {
      sections: [
        { name: 'Section 1', totalMarks: 20 },
        { name: 'Section 2', totalMarks: 30 },
      ],
    },
  };

  try {
    const subjectExists = await Subject.findOne({ name: defaultSubject.name });
    if (!subjectExists) {
      const subject = new Subject(defaultSubject);
      await subject.save();
      console.log('Default subject created.');
    }
  } catch (error) {
    console.error('Error creating default subject:', error.message);
  }
}

module.exports = {
  createDefaultSubject,
};
