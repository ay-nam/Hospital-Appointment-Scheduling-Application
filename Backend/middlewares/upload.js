// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storagePath = path.join(__dirname, '..', 'uploads', 'doctors');
fs.mkdirSync(storagePath, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
