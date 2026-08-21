import path from "path";
import Detection from "../models/Detection.model.js";
/* ==========================================================
   Mood Based Music Library
========================================================== */

const musicLibrary = {
  Happy: {
    id: 1,
    song: "Happy",
    artist: "Pharrell Williams",
    file: "/music/happy.mp3",
    image: "/images/happy.jpg",
  },

  Sad: {
    id: 2,
    song: "Someone Like You",
    artist: "Adele",
    file: "/music/sad.mp3",
    image: "/images/sad.jpg",
  },

  Angry: {
    id: 3,
    song: "Believer",
    artist: "Imagine Dragons",
    file: "/music/angry.mp3",
    image: "/images/angry.jpg",
  },

  Fear: {
    id: 4,
    song: "Demons",
    artist: "Imagine Dragons",
    file: "/music/fear.mp3",
    image: "/images/fear.jpg",
  },

  Surprise: {
    id: 5,
    song: "On Top Of The World",
    artist: "Imagine Dragons",
    file: "/music/surprised.mp3",
    image: "/images/surprised.jpg",
  },

  Disgust: {
    id: 6,
    song: "Fight Song",
    artist: "Rachel Platten",
    file: "/music/disgust.mp3",
    image: "/images/disgust.jpg",
  },

  Neutral: {
    id: 7,
    song: "Perfect",
    artist: "Ed Sheeran",
    file: "/music/focus.mp3",
    image: "/images/neutral.jpg",
  },

  Romantic: {
    id: 8,
    song: "Perfect",
    artist: "Ed Sheeran",
    file: "/music/romantic.mp3",
    image: "/images/romantic.jpg",
  },
};

/* ==========================================================
   Recommended Music
========================================================== */

export const getRecommendedMusic = async (req, res) => {
  try {

    const latestDetection = await Detection.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    if (!latestDetection) {
      return res.status(200).json({
        success: true,
        mood: "Neutral",
        songTitle: musicLibrary.Neutral.song,
        artist: musicLibrary.Neutral.artist,
        audio: musicLibrary.Neutral.file,
        image: musicLibrary.Neutral.image,
      });
    }

    const mood =
      latestDetection.mood.charAt(0).toUpperCase() +
      latestDetection.mood.slice(1).toLowerCase();

    const recommendation =
      musicLibrary[mood] || musicLibrary.Neutral;

    res.status(200).json({
      success: true,
      mood,
      song: {
        title: recommendation.song,
        artist: recommendation.artist,
        audio: recommendation.file,
        image: recommendation.image,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Unable to get recommendation.",
    });

  }
};

/* ==========================================================
   Music By Mood
========================================================== */

export const getMusicByMood = async (req, res) => {
  try {

    const { mood } = req.params;

    const song =
      musicLibrary[mood] || musicLibrary.Neutral;

    res.status(200).json({
      success: true,
      mood,
      song,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================================
   All Playlists
========================================================== */

export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = Object.values(musicLibrary);

    res.status(200).json({
      success: true,
      total: playlists.length,
      playlists,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch playlists.",
    });
  }
};

/* ==========================================================
   Playlist By Id
========================================================== */

export const getPlaylistById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const playlist = Object.values(musicLibrary).find(
      (item) => item.id === id
    );

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found.",
      });
    }

    res.status(200).json({
      success: true,
      playlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch playlist.",
    });
  }
};

/* ==========================================================
   Stream Music
========================================================== */

export const playMusic = async (req, res) => {
  try {
    const { mood } = req.params;

    const music =
      musicLibrary[mood] || musicLibrary.Neutral;

    const filePath = path.join(
      process.cwd(),
      "public",
      music.file
    );

    res.sendFile(filePath);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to play music.",
    });
  }
};