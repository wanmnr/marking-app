import React, { useState } from 'react';

function UploadSheetForm({ subjects, onSubmit }) {
  const [title, setTitle] = useState(''); // State for title input
  const [classGroup, setClassGroup] = useState(''); // State for class group input
  const [subject, setSubject] = useState(''); // State for selected subject
  const [dueDate, setDueDate] = useState(''); // State for due date input
  const [file, setFile] = useState(null); // State for file input

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create FormData object for file upload
    formData.append('title', title);
    formData.append('classGroup', classGroup);
    formData.append('subject', subject);
    formData.append('dueDate', dueDate);
    formData.append('sheetFile', file); // Append file to FormData
    onSubmit(formData); // Submit form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Class Group:</label>
        <input
          type="text"
          value={classGroup}
          onChange={(e) => setClassGroup(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Subject:</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        >
          <option value="">Select a subject</option>
          {subjects.map((subj) => (
            <option key={subj._id} value={subj._id}>
              {subj.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>File:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadSheetForm;
