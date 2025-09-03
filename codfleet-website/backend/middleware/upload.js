const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to create a storage for a specific folder
const createStorage = (folder) => {
  const fullPath = path.join(__dirname, '..', 'uploads', folder);

  // Ensure folder exists
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
};

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);
  cb(new Error('Only .png, .jpg, .jpeg and .pdf files are allowed!'));
};

// Export a function to create multer instance for a folder
const upload = (folder) => multer({
  storage: createStorage(folder),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter
});

module.exports = upload;