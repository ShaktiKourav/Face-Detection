import mongoose from "mongoose";

const detectionSchema = new mongoose.Schema(
  {
    /* ===========================================
       User Reference
    =========================================== */

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* ===========================================
       Face Information
    =========================================== */

    personName: {
      type: String,
      default: "Unknown",
      trim: true,
    },

    lastDetectedAt: {
    type: Date,
    default: Date.now
},



    mood: {
      type: String,
      required: true,
      enum: [
        "Happy",
        "Sad",
        "Angry",
        "Neutral",
        "Surprise",
        "Fear",
        "Disgust",
      ],
    },

    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    /* ===========================================
       Music Recommendation
    =========================================== */

    songTitle: {
      type: String,
      default: "",
    },

    artist: {
      type: String,
      default: "",
    },

    audio: {
      type: String,
      default: "",
    },

    /* ===========================================
       Captured Image
       =========================================== */
  
image: {
  type: String,
  default: "",
},

songImage: {
  type: String,
  default: "",
},


    /* ===========================================
       Camera Information
    =========================================== */

    cameraStatus: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },
  },
  {
    timestamps: true,
  }
);

const Detection = mongoose.model(
  "Detection",
  detectionSchema
);

export default Detection;