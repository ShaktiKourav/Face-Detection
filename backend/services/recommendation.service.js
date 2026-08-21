/* ==========================================================
   AI Mood Recommendation Service
========================================================== */

const recommendations = {
  Happy: {
    mood: "Happy",
    color: "#22C55E",
    emoji: "😊",
    message: "You look happy today! Keep smiling.",
    playlist: "Happy Vibes",
    song: "Happy",
    artist: "Pharrell Williams",
    genre: "Pop",
  },

  Sad: {
    mood: "Sad",
    color: "#3B82F6",
    emoji: "😔",
    message: "Relax and enjoy some peaceful music.",
    playlist: "Calm & Relax",
    song: "Someone Like You",
    artist: "Adele",
    genre: "Acoustic",
  },

  Angry: {
    mood: "Angry",
    color: "#EF4444",
    emoji: "😠",
    message: "Take a deep breath and calm yourself.",
    playlist: "Stress Relief",
    song: "Believer",
    artist: "Imagine Dragons",
    genre: "Rock",
  },

  Fear: {
    mood: "Fear",
    color: "#8B5CF6",
    emoji: "😨",
    message: "Stay calm. Everything will be okay.",
    playlist: "Peaceful Mind",
    song: "Demons",
    artist: "Imagine Dragons",
    genre: "Ambient",
  },

  Surprise: {
    mood: "Surprise",
    color: "#F97316",
    emoji: "😲",
    message: "Looks like something surprised you!",
    playlist: "Fresh Hits",
    song: "On Top Of The World",
    artist: "Imagine Dragons",
    genre: "Pop",
  },

  Disgust: {
    mood: "Disgust",
    color: "#10B981",
    emoji: "🤢",
    message: "Let's improve your mood with relaxing music.",
    playlist: "Fresh Mood",
    song: "Fight Song",
    artist: "Rachel Platten",
    genre: "Instrumental",
  },

  Neutral: {
    mood: "Neutral",
    color: "#6B7280",
    emoji: "😐",
    message: "Have a productive day.",
    playlist: "Focus Playlist",
    song: "Perfect",
    artist: "Ed Sheeran",
    genre: "Lo-Fi",
  },
};

/* ==========================================================
   Get Recommendation
========================================================== */

export const getRecommendation = (mood = "Neutral") => {

  return (
    recommendations[mood] ||
    recommendations.Neutral
  );

};

/* ==========================================================
   Recommendation Message
========================================================== */

export const getRecommendationMessage = (mood) => {

  return getRecommendation(mood).message;

};

/* ==========================================================
   Playlist
========================================================== */

export const getRecommendedPlaylist = (mood) => {

  return getRecommendation(mood).playlist;

};

/* ==========================================================
   Song
========================================================== */

export const getRecommendedSong = (mood) => {

  const data = getRecommendation(mood);

  return {
    song: data.song,
    artist: data.artist,
    genre: data.genre,
  };

};

/* ==========================================================
   All Recommendations
========================================================== */

export const getAllRecommendations = () => {

  return recommendations;

};

export default {
  getRecommendation,
  getRecommendationMessage,
  getRecommendedPlaylist,
  getRecommendedSong,
  getAllRecommendations,
};