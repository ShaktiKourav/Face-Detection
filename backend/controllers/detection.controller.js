import Detection from "../models/Detection.model.js";import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { detectEmotion } from "../services/ai.service.js";
import Detection from "../models/Detection.model.js";
import { detectMood } from "../services/mood.service.js";

/* ==========================================================
   Save Face Detection
========================================================== */

export const saveDetection = async (req, res) => {
  try {
    const {
      personName,
      mood,
      confidence,
      songTitle,
      artist,
      audio,
      image,
      cameraStatus,
    } = req.body;

    const detection = await Detection.create({
      user: req.user._id,
      personName,
      mood,
      confidence,
      songTitle,
      artist,
      audio,
      image,
      cameraStatus,
    });

    res.status(201).json({
      success: true,
      message: "Detection Saved Successfully",
      detection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   Get All Detection History
========================================================== */

export const getDetectionHistory = async (req, res) => {
  try {
    const history = await Detection.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   Get Single Detection
========================================================== */

export const getDetectionById = async (req, res) => {
  try {
    const detection = await Detection.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Detection Not Found",
      });
    }

    res.status(200).json({
      success: true,
      detection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   Delete Detection
========================================================== */

export const deleteDetection = async (req, res) => {
  try {
    const detection = await Detection.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Detection Not Found",
      });
    }

    await detection.deleteOne();

    res.status(200).json({
      success: true,
      message: "Detection Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   Dashboard Statistics
========================================================== */

export const getDashboardStats = async (req, res) => {
  try {
    const totalDetections = await Detection.countDocuments({
      user: req.user._id,
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayDetections = await Detection.countDocuments({
      user: req.user._id,
      createdAt: {
        $gte: today,
      },
    });

    const latestDetection = await Detection.findOne({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalDetections,
        todayDetections,
        latestMood: latestDetection?.mood || "Neutral",
        latestConfidence: latestDetection?.confidence || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   Mood Recommendation
========================================================== */

export const getMoodRecommendation = async (req, res) => {
  try {
    const latest = await Detection.findOne({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    if (!latest) {
      return res.status(404).json({
        success: false,
        message: "No Detection Found",
      });
    }

    res.status(200).json({
      success: true,
      mood: latest.mood,
      songTitle: latest.songTitle,
      artist: latest.artist,
      audio: latest.audio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==========================================================
   Capture Face Detection
========================================================== */

export const captureDetection = async (req, res) => {
  try {
    const { image, personName = "Unknown" } = req.body;

  const user = req.user;

if (user.currentMood !== mood) {

    user.currentMood = mood;

    await user.save();

    await Detection.create({

        user: user._id,

        personName,

        mood,

        confidence: aiResult.confidence,

        songTitle: song.title,

        artist: song.artist,

        audio: song.audio,

        image: imageUrl,

        cameraStatus: "Online"

    });

}

    /* ===========================================
       Convert Base64 Image
    =========================================== */

    const base64Data = image.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const buffer = Buffer.from(base64Data, "base64");

    /* ===========================================
       Upload Folder
    =========================================== */

    const uploadDir = path.join(
      process.cwd(),
      "uploads",
      "detections"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    /* ===========================================
       Save Image
    =========================================== */

    const fileName = `${uuid()}.jpg`;

    const filePath = path.join(
      uploadDir,
      fileName
    );

    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/detections/${fileName}`;

    /* ===========================================
       AI Emotion Detection
    =========================================== */

    const aiResult = await detectEmotion(filePath);

    /* ===========================================
       Song Recommendation
    =========================================== */

    const mood = aiResult.emotion.toLowerCase();

    const songs = {
      happy: {
        title: "Happy Vibes",
        artist: "AI Playlist",
        audio: "/music/happy.mp3",
      },

      sad: {
        title: "Sad Evening",
        artist: "AI Playlist",
        audio: "/music/sad.mp3",
      },

      angry: {
        title: "Relax Mind",
        artist: "AI Playlist",
        audio: "/music/angry.mp3",
      },

      neutral: {
        title: "Focus Mode",
        artist: "AI Playlist",
        audio: "/music/focus.mp3",
      },

      surprise: {
        title: "Amazing Day",
        artist: "AI Playlist",
        audio: "/music/surprised.mp3",
      },

      fear: {
        title: "Peaceful Mind",
        artist: "AI Playlist",
        audio: "/music/fear.mp3",
      },

      disgust: {
        title: "Fresh Mood",
        artist: "AI Playlist",
        audio: "/music/disgust.mp3",
      },
    };

    const song =
      songs[mood] || songs.neutral;

    /* ===========================================
       Save Detection
    =========================================== */

    const detection =
      await Detection.create({
        user: req.user._id,

        personName,

        mood,

        confidence: aiResult.confidence,

        songTitle: song.title,

        artist: song.artist,

        audio: song.audio,

        image: imageUrl,

        cameraStatus: "Online",
      });

    /* ===========================================
       Response
    =========================================== */

    res.status(201).json({
      success: true,

      message: "Face detected successfully",

      mood,

      confidence: aiResult.confidence,

      age: aiResult.age,

      gender: aiResult.gender,

      song,

      detection,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};