import express from "express";
import {
  captureDetection,
  saveDetection,
  getDetectionHistory,
  getDetectionById,
  deleteDetection,
  getDashboardStats,
  getMoodRecommendation,
} from "../controllers/detection.controller.js";
import protect from "../middleware/auth.middleware.js";


const router = express.Router();

/* ==========================================================
   capture detection
========================================================== */

router.post(
  "/capture",
  protect,
  captureDetection
);

/* ==========================================================
   Save Detection
========================================================== */

router.post("/", protect, saveDetection);

/* ==========================================================
   Detection History
========================================================== */

router.get("/history", protect, getDetectionHistory);

/* ==========================================================
   Dashboard Statistics
========================================================== */

router.get("/dashboard", protect, getDashboardStats);

/* ==========================================================
   Mood Recommendation
========================================================== */

router.get("/recommendation", protect, getMoodRecommendation);

/* ==========================================================
   Single Detection
========================================================== */

router.get("/:id", protect, getDetectionById);

/* ==========================================================
   Delete Detection
========================================================== */

router.delete("/:id", protect, deleteDetection);

export default router;