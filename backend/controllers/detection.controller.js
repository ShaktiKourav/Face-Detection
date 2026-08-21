import Detection from "../models/Detection.model.js";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { detectEmotion } from "../services/ai.service.js";
import { musicLibrary } from "../data/musicLibrary.js";

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
      songImage,
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
      songImage,
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

  song: {
    title: latest.songTitle,
    artist: latest.artist,
    audio: latest.audio,
    image: latest.songImage,
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
   Capture Face Detection
========================================================== */

export const captureDetection = async (req, res) => {
  try {
    const { image, personName = "Unknown" } = req.body;
    
    if (!image) {
  return res.status(400).json({
    success: false,
    message: "Image is required",
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

console.log("Saving Image :", filePath);

fs.writeFileSync(filePath, buffer);

console.log("Image Saved :", fs.existsSync(filePath));

const stats = fs.statSync(filePath);

console.log("================================");
console.log("Current Dir :", process.cwd());
console.log("Upload Dir  :", uploadDir);
console.log("File Path   :", filePath);
console.log("Exists      :", fs.existsSync(filePath));
console.log("File Size   :", stats.size, "bytes");
console.log("================================");

const imageUrl = `/uploads/detections/${fileName}`;

/* ===========================================
   AI Emotion Detection
=========================================== */

const aiResult = await detectEmotion(filePath);

console.log("================================");
console.log("AI Result :", aiResult);
console.log("================================");

if (!aiResult.success) {
  return res.status(500).json({
    success: false,
    message: "Emotion detection failed",
    aiResult,
  });
}

const mood =
  (aiResult.emotion || "Neutral")
    .charAt(0)
    .toUpperCase() +
  (aiResult.emotion || "Neutral")
    .slice(1)
    .toLowerCase();


/* ===========================================
   Song Recommendation
=========================================== */

// const songs = {
//   happy: {
//     title: "Happy Vibes",
//     artist: "AI Playlist",
//     audio: "/music/happy.mp3",
//   },

//   sad: {
//     title: "Sad Evening",
//     artist: "AI Playlist",
//     audio: "/music/sad.mp3",
//   },

//   angry: {
//     title: "Relax Mind",
//     artist: "AI Playlist",
//     audio: "/music/angry.mp3",
//   },

//   neutral: {
//     title: "Focus Mode",
//     artist: "AI Playlist",
//     audio: "/music/focus.mp3",
//   },

//   surprise: {
//     title: "Amazing Day",
//     artist: "AI Playlist",
//     audio: "/music/surprised.mp3",
//   },

//   fear: {
//     title: "Peaceful Mind",
//     artist: "AI Playlist",
//     audio: "/music/fear.mp3",
//   },

//   disgust: {
//     title: "Fresh Mood",
//     artist: "AI Playlist",
//     audio: "/music/disgust.mp3",
//   },
// };


const song =
  musicLibrary[mood] ?? musicLibrary.Neutral;

/* ===========================================
   Update User Mood
=========================================== */

const user = req.user;

if (user.currentMood !== mood) {
  user.currentMood = mood;
  await user.save();
}

/* ===========================================
   Save Detection
=========================================== */

const detection = await Detection.create({
  user: req.user._id,
  personName,
  mood,
  confidence: aiResult.confidence || 0,

  songTitle: song.song,
  artist: song.artist,
  audio: song.file,
  songImage: song.image,

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

      song: {
  title: song.song,
  artist: song.artist,
  audio: song.file,
  image: song.image,
},

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