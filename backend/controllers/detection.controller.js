import Detection from "../models/Detection.model.js";
import fs from "fs";
import path from "path";
import { uploadImageToImageKit } from "../services/imageUpload.service.js";
import { v4 as uuid } from "uuid";
import { detectEmotion } from "../services/ai.service.js";
import { musicLibrary } from "../data/musicLibrary.js";
import User from "../models/User.model.js";
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

// export const captureDetection = async (req, res) => {
//   try {
//     const { image } = req.body;
    
//     if (!image) {
//   return res.status(400).json({
//     success: false,
//     message: "Image is required",
//   });
// }
// const user = await User.findById(req.user._id).select(
//   "name currentMood"
// );

// if (!user) {
//   return res.status(404).json({
//     success: false,
//     message: "User not found",
//   });
// }

// const personName = user.name;
//     /* ===========================================
//        Convert Base64 Image
//     =========================================== */

//     const base64Data = image.replace(
//       /^data:image\/\w+;base64,/,
//       ""
//     );

//     const buffer = Buffer.from(base64Data, "base64");

//  /* ===========================================
//    Upload Folder
// =========================================== */

// const uploadDir = path.join(
//   process.cwd(),
//   "uploads",
//   "detections"
// );

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, {
//     recursive: true,
//   });
// }

// /* ===========================================
//    Save Image
// =========================================== */

// const fileName = `${uuid()}.jpg`;

// const filePath = path.join(
//   uploadDir,
//   fileName
// );

// console.log("Saving Image :", filePath);

// fs.writeFileSync(filePath, buffer);

// console.log("Image Saved :", fs.existsSync(filePath));

// const stats = fs.statSync(filePath);

// console.log("================================");
// console.log("Current Dir :", process.cwd());
// console.log("Upload Dir  :", uploadDir);
// console.log("File Path   :", filePath);
// console.log("Exists      :", fs.existsSync(filePath));
// console.log("File Size   :", stats.size, "bytes");
// console.log("================================");

// const imageUrl = `/uploads/detections/${fileName}`;

// /* ===========================================
//    AI Emotion Detection
// =========================================== */

// const aiResult = await detectEmotion(filePath);

// console.log("================================");
// console.log("AI Result :", aiResult);
// console.log("================================");

// if (!aiResult.success) {
//   return res.status(500).json({
//     success: false,
//     message: "Emotion detection failed",
//     aiResult,
//   });
// }

// const mood =
//   (aiResult.emotion || "Neutral")
//     .charAt(0)
//     .toUpperCase() +
//   (aiResult.emotion || "Neutral")
//     .slice(1)
//     .toLowerCase();


// /* ===========================================
//    Song Recommendation
// =========================================== */

// // const songs = {
// //   happy: {
// //     title: "Happy Vibes",
// //     artist: "AI Playlist",
// //     audio: "/music/happy.mp3",
// //   },

// //   sad: {
// //     title: "Sad Evening",
// //     artist: "AI Playlist",
// //     audio: "/music/sad.mp3",
// //   },

// //   angry: {
// //     title: "Relax Mind",
// //     artist: "AI Playlist",
// //     audio: "/music/angry.mp3",
// //   },

// //   neutral: {
// //     title: "Focus Mode",
// //     artist: "AI Playlist",
// //     audio: "/music/focus.mp3",
// //   },

// //   surprise: {
// //     title: "Amazing Day",
// //     artist: "AI Playlist",
// //     audio: "/music/surprised.mp3",
// //   },

// //   fear: {
// //     title: "Peaceful Mind",
// //     artist: "AI Playlist",
// //     audio: "/music/fear.mp3",
// //   },

// //   disgust: {
// //     title: "Fresh Mood",
// //     artist: "AI Playlist",
// //     audio: "/music/disgust.mp3",
// //   },
// // };


// const song =
//   musicLibrary[mood] ?? musicLibrary.Neutral;

// /* ===========================================
//    Update User Mood
// =========================================== */

// if (user.currentMood !== mood) {
//   user.currentMood = mood;
//   await user.save();
// }

// /* ===========================================
//    Save Detection
// =========================================== */

// const detection = await Detection.create({
//   user: req.user._id,
//   personName,
//   mood,
//   confidence: aiResult.confidence || 0,

//   songTitle: song.song,
//   artist: song.artist,
//   audio: song.file,
//   songImage: song.image,

//   image: imageUrl,

//   cameraStatus: "Online",
// });

//     /* ===========================================
//        Response
//     =========================================== */

//     res.status(201).json({
//       success: true,

//       message: "Face detected successfully",

//       mood,

//       confidence: aiResult.confidence,

//       age: aiResult.age,

//       gender: aiResult.gender,

//       song: {
//   title: song.song,
//   artist: song.artist,
//   audio: song.file,
//   image: song.image,
// },

//       detection,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



export const captureDetection = async (req, res) => {
  console.log("🔥🔥🔥 CAPTURE DETECTION ROUTE HIT 🔥🔥🔥");

  try {
    const { image } = req.body;

    console.log("📸 Image received:", !!image);

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // ==========================================
    // USER
    // ==========================================

    const user = await User.findById(req.user._id).select(
      "name currentMood"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const personName = user.name || "Unknown";

    console.log("👤 User:", personName);

    // ==========================================
    // BASE64 → BUFFER
    // ==========================================

    const base64Data = image.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const buffer = Buffer.from(base64Data, "base64");

    console.log("📦 Image buffer size:", buffer.length);

    if (!buffer.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid image data",
      });
    }

    // ==========================================
    // TEMP DIRECTORY
    // ==========================================

    const tempDir = path.join(
      process.cwd(),
      "temp"
    );

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, {
        recursive: true,
      });
    }

    const fileName = `${uuid()}.jpg`;

    const filePath = path.join(
      tempDir,
      fileName
    );

    fs.writeFileSync(filePath, buffer);

    console.log("📸 Temporary image:", filePath);
    console.log(
      "📁 Temporary exists:",
      fs.existsSync(filePath)
    );

    // ==========================================
    // PYTHON AI
    // ==========================================

    console.log("⏳ Starting Python AI...");

    const aiResult = await detectEmotion(filePath);

    console.log("✅ Python AI finished");
    console.log("🤖 AI Result:", aiResult);

    if (!aiResult?.success) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(500).json({
        success: false,
        message: "Emotion detection failed",
        aiResult,
      });
    }

    // ==========================================
    // IMAGEKIT
    // ==========================================

    console.log("⏳ Starting ImageKit upload...");

    const imageUrl = await uploadImageToImageKit(
      buffer,
      fileName
    );

    console.log("✅ ImageKit upload finished");
    console.log("☁️ ImageKit URL:", imageUrl);

    if (!imageUrl) {
      throw new Error(
        "ImageKit did not return image URL"
      );
    }

    // ==========================================
    // DELETE TEMP FILE
    // ==========================================

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🗑️ Temporary image deleted");
    }

    // ==========================================
    // MOOD
    // ==========================================

    const detectedEmotion =
      aiResult.emotion || "Neutral";

    const mood =
      detectedEmotion.charAt(0).toUpperCase() +
      detectedEmotion.slice(1).toLowerCase();

    console.log("🎭 Mood:", mood);

    // ==========================================
    // SONG
    // ==========================================

    const song =
      musicLibrary[mood] ||
      musicLibrary.Neutral;

    console.log("🎵 Song:", song);

    if (!song) {
      throw new Error(
        `No music found for mood: ${mood}`
      );
    }

    // ==========================================
    // UPDATE USER
    // ==========================================

    if (user.currentMood !== mood) {
      user.currentMood = mood;
      await user.save();

      console.log("✅ User mood updated");
    }

    // ==========================================
    // MONGODB
    // ==========================================

    console.log(
      "⏳ Saving detection to MongoDB..."
    );

    const detection = await Detection.create({
      user: req.user._id,

      personName,

      mood,

      confidence: Number(
        aiResult.confidence || 0
      ),

      songTitle: song.song || "",

      artist: song.artist || "",

      audio: song.file || "",

      songImage: song.image || "",

      // ⭐ ONLY IMAGEKIT URL
      image: imageUrl,

      cameraStatus: "Online",

      lastDetectedAt: new Date(),
    });

    console.log(
      "✅ Detection saved to MongoDB"
    );

    console.log(
      "🆔 Detection ID:",
      detection._id
    );

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,

      message: "Face detected successfully",

      mood,

      confidence: aiResult.confidence || 0,

      age: aiResult.age,

      gender: aiResult.gender,

      song: {
        title: song.song || "",
        artist: song.artist || "",
        audio: song.file || "",
        image: song.image || "",
      },

      detection,
    });

  } catch (error) {

    console.error("");
    console.error(
      "=============================================="
    );
    console.error(
      "❌ CAPTURE DETECTION ERROR"
    );
    console.error(
      "=============================================="
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Name:",
      error.name
    );

    console.error(
      "Stack:",
      error.stack
    );

    console.error(
      "=============================================="
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



