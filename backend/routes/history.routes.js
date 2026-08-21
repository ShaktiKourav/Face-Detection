import express from "express";

import {
  getHistory,
  getHistoryById,
  deleteHistory,
  clearHistory,
} from "../controllers/history.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

/* ==========================================================
   GET ALL HISTORY
========================================================== */

router.get(
  "/",
  protect,
  getHistory
);

/* ==========================================================
   GET SINGLE HISTORY
========================================================== */

router.get(
  "/:id",
  protect,
  getHistoryById
);

/* ==========================================================
   DELETE SINGLE HISTORY
========================================================== */

router.delete(
  "/:id",
  protect,
  deleteHistory
);

/* ==========================================================
   CLEAR COMPLETE HISTORY
========================================================== */

router.delete(
  "/clear/all",
  protect,
  clearHistory
);

export default router;