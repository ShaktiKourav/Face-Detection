/* ==========================================================
   APPLICATION
========================================================== */

export const APP_NAME = "AI MoodSense";

export const APP_VERSION = "1.0.0";

/* ==========================================================
   USER ROLES
========================================================== */

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};

/* ==========================================================
   MOODS
========================================================== */

export const MOODS = [
  "Happy",
  "Sad",
  "Angry",
  "Fear",
  "Surprise",
  "Disgust",
  "Neutral",
];

/* ==========================================================
   MOOD COLORS
========================================================== */

export const MOOD_COLORS = {
  Happy: "#22C55E",
  Sad: "#3B82F6",
  Angry: "#EF4444",
  Fear: "#8B5CF6",
  Surprise: "#F59E0B",
  Disgust: "#10B981",
  Neutral: "#6B7280",
};

/* ==========================================================
   MOOD EMOJIS
========================================================== */

export const MOOD_EMOJIS = {
  Happy: "😊",
  Sad: "😔",
  Angry: "😠",
  Fear: "😨",
  Surprise: "😲",
  Disgust: "🤢",
  Neutral: "😐",
};

/* ==========================================================
   MUSIC GENRES
========================================================== */

export const MUSIC_GENRES = {
  Happy: "Pop",
  Sad: "Acoustic",
  Angry: "Rock",
  Fear: "Ambient",
  Surprise: "Electronic",
  Disgust: "Instrumental",
  Neutral: "Lo-Fi",
};

/* ==========================================================
   API STATUS
========================================================== */

export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  FAILED: "failed",
};

/* ==========================================================
   DEFAULT VALUES
========================================================== */

export const DEFAULT_PROFILE_IMAGE =
  "https://ui-avatars.com/api/?name=User";

export const DEFAULT_MOOD = "Neutral";

export const DEFAULT_SONG = "Happy Vibes";

/* ==========================================================
   PAGINATION
========================================================== */

export const PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
};

/* ==========================================================
   HTTP STATUS
========================================================== */

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};