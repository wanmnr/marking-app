// backend/src/api/models/User.js
const mongoose = require('mongoose');

/**
 * Schema definition for User model
 * Contains validation rules and type definitions for user properties
 * @typedef {Object} UserSchema
 */
const UserSchema = new mongoose.Schema({
  /**
   * Username field
   * Must be unique and is required
   * @type {String}
   * @required
   * @unique
   */
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },

  /**
   * Email field
   * Must be unique, required and match email format
   * @type {String}
   * @required
   * @unique
   * @matches /^\S+@\S+\.\S+$/
   */
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },

  /**
   * Password field
   * Must be at least 6 characters long
   * @type {String}
   * @required
   * @minlength 6
   */
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
});

/**
 * Mongoose model for User
 * @type {mongoose.Model}
 */
module.exports = mongoose.model('User', UserSchema);
