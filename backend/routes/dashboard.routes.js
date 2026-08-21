import express from "express";

import {
  getDashboardData,
  getRecentActivity,
  getMoodStats,
} from "../controllers/dashboard.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

/* ==========================================================
   DASHBOARD SUMMARY
========================================================== */

router.get(
  "/stats",
  protect,
  getDashboardData
);

/* ==========================================================
   RECENT ACTIVITY
========================================================== */

router.get(
  "/activity",
  protect,
  getRecentActivity
);

/* ==========================================================
   MOOD STATISTICS
========================================================== */

router.get(
  "/analytics",
  protect,
  getMoodStats
);

export default router;