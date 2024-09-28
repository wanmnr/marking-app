// /backend/src/api/middleware/uploadMiddleware.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { CustomError } = require('../../utils/errorHandlers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        'Invalid file type. Only PDFs and images are allowed.',
        400
      ),
      false
    );
  }
};

module.exports = multer({ storage, fileFilter });
