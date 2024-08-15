// Frontend - /frontend/src/components/UploadSheet.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function UploadSheet() {
  const [title, setTitle] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch the available subjects from the backend when the component mounts
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await fetch('http://localhost:5000/subjects', {
          headers: {
            'x-auth-token': AuthService.getToken(),
          },
        });
        if (res.ok) {
          const data = await res.json();
          setSubjects(data); // Set the list of subjects
        } else {
          console.error('Failed to fetch subjects');
        }
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }
    }
    fetchSubjects();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('classGroup', classGroup);
    formData.append('subject', subject);
    formData.append('dueDate', dueDate);
    formData.append('sheetFile', file);

    try {
      const res = await fetch('http://localhost:5000/sheets', {
        method: 'POST',
        headers: {
          'x-auth-token': AuthService.getToken(),
        },
        body: formData, // Send form data with the file and other fields
      });

      if (res.ok) {
        setSuccess(true);
        navigate('/'); // Redirect to the dashboard after successful upload
      } else {
        const data = await res.json();
        setError(data.errors ? data.errors.map(err => err.msg).join(', ') : 'Upload failed');
      }
    } catch (err) {
      console.error('Error uploading sheet:', err);
      setError('Server error');
    }
  };

  return (
    <div>
      <h2>Upload Exam Sheet</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Upload successful!</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Class Group:</label>
          <input type="text" value={classGroup} onChange={(e) => setClassGroup(e.target.value)} required />
        </div>
        <div>
          <label>Subject:</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
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
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div>
          <label>File:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadSheet;
