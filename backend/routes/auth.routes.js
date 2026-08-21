




import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
  getProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

/* ==========================================================
   PUBLIC AUTH ROUTES
========================================================== */

/* ================= Register ================= */

router.post(
  "/register",
  registerUser
);

/* ================= Login ================= */

router.post(
  "/login",
  loginUser
);

/* ================= Google Login ================= */

router.post(
  "/google",
  googleLogin
);


/* ==========================================================
   PROTECTED AUTH ROUTES
========================================================== */

/* ================= Logout ================= */

router.post(
  "/logout",
  protect,
  logoutUser
);

/* ================= Profile ================= */

router.get(
  "/profile",
  protect,
  getProfile
);


export default router;