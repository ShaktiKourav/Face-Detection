import express from "express";
import upload from "../middleware/upload.middleware.js";
import protect from "../middleware/auth.middleware.js";

import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  updateProfileImage,
} from "../controllers/user.controller.js";

const router = express.Router();

/* ================= Profile ================= */

router.get("/profile", protect, getUserProfile);

/* ================= Update Profile ================= */

router.put("/profile", protect, updateUserProfile);

/* ================= Change Password ================= */

router.put("/change-password", protect, changePassword);

/* ================= Update Image ================= */

router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  updateProfileImage
);

export default router;