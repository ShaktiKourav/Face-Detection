import mongoose from "mongoose";

/* ==========================================================
   HISTORY SCHEMA
========================================================== */

const historySchema = new mongoose.Schema(
  {
    /* ==========================================
        USER
    ========================================== */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* ==========================================
        PERSON NAME
    ========================================== */

    personName: {
      type: String,
      default: "Unknown",
      trim: true,
    },

    /* ==========================================
        DETECTED MOOD
    ========================================== */

    mood: {
      type: String,
      required: true,
      enum: [
        "Happy",
        "Sad",
        "Angry",
        "Fear",
        "Surprise",
        "Disgust",
        "Neutral",
        "Romantic",
      ],
    },

    /* ==========================================
        AI CONFIDENCE
    ========================================== */

    confidence: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    /* ==========================================
        RECOMMENDED SONG
    ========================================== */

    song: {
      type: String,
      default: "",
    },

    /* ==========================================
        ARTIST
    ========================================== */

    artist: {
      type: String,
      default: "",
    },

    /* ==========================================
        IMAGE
    ========================================== */

    image: {
      type: String,
      default: "",
    },

    /* ==========================================
        DEVICE
    ========================================== */

    device: {
      type: String,
      default: "Web",
    },

    /* ==========================================
        LOCATION
    ========================================== */

    location: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* ==========================================================
   EXPORT MODEL
========================================================== */

const History = mongoose.model(
  "History",
  historySchema
);

export default History;