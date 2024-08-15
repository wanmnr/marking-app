// Backend - /backend/index.js

require('dotenv').config(); // Load environment variables from .env file for securing whatever key

const express = require('express'); // Express.js framework for building web applications
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const authRoutes = require('./routes/auth'); // Import authentication routes
const sheetRoutes = require('./routes/sheets'); // Import sheet management routes
const subjectRoutes = require('./routes/subjects'); // Import subject management routes
const exportRoutes = require('./routes/export'); // Import export data routes
const { createDefaultSubject } = require('./utils/subjectUtils'); // Import the utility function


const app = express(); // Initialize Express app
const PORT = process.env.PORT || 5000; // Define the port for the server, using environment variable or default to 5000

// Middleware Setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(express.json()); // Parse incoming JSON requests

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Marking App Backend'); // Send a simple response for the root URL
});

// Database Connection using Mongoose
mongoose
  .connect(
    process.env.MONGODB_URI, // call connectionString from .env
    {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
      connectTimeoutMS: 10000, // Set timeout to 10 seconds
    }
  )
  .then(() => console.log('MongoDB connected')) // Successful connection message
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure if unable to connect
  });

// Register Routes
app.use('/auth', authRoutes); // Authentication-related routes
app.use('/sheets', sheetRoutes); // Routes for handling marking sheets
app.use('/subjects', subjectRoutes); // Routes for handling subjects
app.use('/export', exportRoutes); // Routes for exporting data (CSV, Excel, PDF)

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server start message
});
