// Backend - /backend/models/User.js

const mongoose = require('mongoose'); // Import Mongoose

// Define the schema for a User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username must be unique
  password: { type: String, required: true }, // Password (hashed)
});

// Export the User model based on the UserSchema
module.exports = mongoose.model('User', UserSchema);
