// Backend - /backend/middleware/checkAuth.js

const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and authorize the user
module.exports = function (req, res, next) {
  const token = req.cookies.token; // Get the token from the HttpOnly cookie

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
