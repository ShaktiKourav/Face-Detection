import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

/* ================= Register ================= */

router.post("/register", registerUser);

/* ================= Login ================= */

router.post("/login", loginUser);

/* ================= Logout ================= */

router.post("/logout", logoutUser);

export default router;