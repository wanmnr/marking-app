import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadSheetForm from '../components/UploadSheetForm';
import { useSheets } from '../hooks/useSheets';
import subjectService from '../services/SubjectService'; // Refactored subject service

function UploadSheet() {
  const [subjects, setSubjects] = useState([]); // State to store subjects
  const [error, setError] = useState(''); // State to handle errors
  const [success, setSuccess] = useState(false); // State to handle success messages
  const navigate = useNavigate();
  const { uploadSheet } = useSheets(); // Access sheet upload action from context

  // Fetch subjects on component mount
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const fetchedSubjects = await subjectService.getSubjects();
        setSubjects(fetchedSubjects); // Update state with fetched subjects
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError('Failed to fetch subjects');
      }
    }
    fetchSubjects();
  }, []);

  // Handle form submission for uploading sheet
  const handleSubmit = async (formData) => {
    setError('');
    setSuccess(false);

    try {
      await uploadSheet(formData); // Upload the sheet using context
      setSuccess(true);
      navigate('/'); // Navigate to the home page on success
    } catch (err) {
      setError(err.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Exam Sheet</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
      {success && <p style={{ color: 'green' }}>Upload successful!</p>} {/* Display success */}
      <UploadSheetForm subjects={subjects} onSubmit={handleSubmit} /> {/* Form component */}
    </div>
  );
}

export default UploadSheet;
