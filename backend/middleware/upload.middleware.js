

import multer from "multer";
import path from "path";
import fs from "fs";

/* ==========================================================
   UPLOAD DIRECTORY
========================================================== */

const uploadPath = path.join(
  process.cwd(),
  "uploads",
  "profiles"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

/* ==========================================================
   STORAGE
========================================================== */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    cb(
      null,
      uniqueName +
        path.extname(file.originalname).toLowerCase()
    );
  },
});

/* ==========================================================
   FILE FILTER
========================================================== */

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (
    allowedMimeTypes.includes(file.mimetype)
  ) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only JPG, JPEG, PNG and WEBP files are allowed."
    )
  );
};

/* ==========================================================
   MULTER
========================================================== */

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;