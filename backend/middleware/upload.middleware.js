import multer from "multer";
import path from "path";
import fs from "fs";

/* ==========================================================
   Create Upload Folder Automatically
========================================================== */

const uploadPath = "uploads/profiles";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* ==========================================================
   Storage Configuration
========================================================== */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

/* ==========================================================
   File Filter
========================================================== */

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG and WEBP files are allowed."
    )
  );
};

/* ==========================================================
   Upload Middleware
========================================================== */

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;