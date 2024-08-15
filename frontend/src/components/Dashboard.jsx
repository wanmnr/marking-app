// Frontend - /frontend/src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for navigation
import AuthService from '../services/AuthService'; // Import the authentication service
import SheetService from '../services/SheetService'; // Import the sheet service

function Dashboard() {
  console.log("Rendering Dashboard component");

  const [sheets, setSheets] = useState([]); // State to store the list of sheets
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    console.log("Dashboard useEffect triggered");
    fetchSheets(); // Fetch the sheets when the component mounts
  }, []);

  const fetchSheets = async () => {
    try {
      const data = await SheetService.getSheets(); // Fetch the list of sheets from the backend
      setSheets(data); // Update state with the fetched data
      console.log("Sheets data fetched:", data);
    } catch (error) {
      console.error('Error fetching sheets:', error);
    }
  };

  const logout = () => {
    AuthService.logout(); // Log out the user by clearing the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/upload')}>Upload New Sheet</button> {/* Button to navigate to upload page */}
      <button onClick={logout}>Logout</button> {/* Logout button */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Class Group</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Score</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {sheets.map((sheet) => (
            <tr key={sheet._id}>
              <td>{sheet.title}</td>
              <td>{sheet.classGroup}</td>
              <td>{sheet.subject.name}</td>
              <td>{sheet.status}</td>
              <td>{sheet.score}</td>
              <td>{new Date(sheet.dueDate).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
