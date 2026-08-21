/* ==========================================================
   AUTH VALIDATION
========================================================== */

export const validateRegister = (req, res, next) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {

    return res.status(400).json({
      success: false,
      message: "Name, email and password are required.",
    });

  }

  if (password.length < 6) {

    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters.",
    });

  }

  next();

};

/* ==========================================================
   LOGIN VALIDATION
========================================================== */

export const validateLogin = (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {

    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });

  }

  next();

};

/* ==========================================================
   FACE DETECTION VALIDATION
========================================================== */

export const validateDetection = (req, res, next) => {

  const { image } = req.body;

  if (!image) {

    return res.status(400).json({
      success: false,
      message: "Image is required.",
    });

  }

  next();

};

/* ==========================================================
   UPDATE PROFILE VALIDATION
========================================================== */

export const validateProfile = (req, res, next) => {

  const { name, email } = req.body;

  if (!name || !email) {

    return res.status(400).json({
      success: false,
      message: "Name and email are required.",
    });

  }

  next();

};

/* ==========================================================
   MOOD VALIDATION
========================================================== */

export const validateMood = (req, res, next) => {

  const { mood } = req.params;

  const moods = [
    "Happy",
    "Sad",
    "Angry",
    "Fear",
    "Surprise",
    "Disgust",
    "Neutral",
    "Romantic",
  ];

  if (!moods.includes(mood)) {

    return res.status(400).json({
      success: false,
      message: "Invalid mood.",
    });

  }

  next();

};