import express from "express";

import {
  getRecommendedMusic,
  getMusicByMood,
  getAllPlaylists,
  getPlaylistById,
  playMusic,
} from "../controllers/music.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

/* ==========================================
   RECOMMENDED MUSIC
========================================== */

router.get("/recommendation", protect, getRecommendedMusic);

/* ==========================================
   MUSIC BY MOOD
========================================== */

router.get("/mood/:mood", protect, getMusicByMood);

/* ==========================================
   ALL PLAYLISTS
========================================== */

router.get("/playlists", protect, getAllPlaylists);

/* ==========================================
   PLAYLIST BY ID
========================================== */

router.get("/playlist/:id", protect, getPlaylistById);

/* ==========================================
   PLAY MUSIC
========================================== */

router.get("/play/:mood", protect, playMusic);

export default router;