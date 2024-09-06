// Backend - /backend/middleware/checkAuth.js

const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication

// Middleware to verify JWT token and authorize the user
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token'); // Get the token from the request header

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); // Return an error if no token is provided
  }

  try {
    const decoded = jwt.verify(token, 'secretToken'); // Verify the token using the secret key
    req.user = decoded.user; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' }); // Return an error if the token is invalid
  }
};
