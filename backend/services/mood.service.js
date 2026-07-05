const moodDatabase = {
  Happy: {
    mood: "Happy",
    confidence: 98,
    songTitle: "Happy Vibes",
    artist: "AI Playlist",
    audio: "/music/happy.mp3",
    color: "from-pink-500 to-violet-600",
  },

  Sad: {
    mood: "Sad",
    confidence: 94,
    songTitle: "Let It Go",
    artist: "AI Playlist",
    audio: "/music/sad.mp3",
    color: "from-blue-500 to-cyan-600",
  },

  Angry: {
    mood: "Angry",
    confidence: 96,
    songTitle: "Calm Down",
    artist: "AI Playlist",
    audio: "/music/angry.mp3",
    color: "from-red-500 to-orange-600",
  },

  Neutral: {
    mood: "Neutral",
    confidence: 95,
    songTitle: "Focus Mode",
    artist: "AI Playlist",
    audio: "/music/focus.mp3",
    color: "from-slate-500 to-gray-700",
  },

  Surprised: {
    mood: "Surprised",
    confidence: 93,
    songTitle: "Amazing Day",
    artist: "AI Playlist",
    audio: "/music/surprised.mp3",
    color: "from-yellow-500 to-orange-500",
  },

  Romantic: {
  mood: "Romantic",
  confidence: 97,
  songTitle: "Perfect Love",
  artist: "AI Playlist",
  audio: "/music/romantic.mp3",
  color: "from-rose-500 to-pink-600",
 },

  Fear: {
    mood: "Fear",
    confidence: 91,
    songTitle: "Peaceful Mind",
    artist: "AI Playlist",
    audio: "/music/fear.mp3",
    color: "from-indigo-500 to-violet-600",
  },

  Disgust: {
    mood: "Disgust",
    confidence: 92,
    songTitle: "Fresh Start",
    artist: "AI Playlist",
    audio: "/music/disgust.mp3",
    color: "from-green-500 to-emerald-600",
  },
};

/* ==========================================================
   Random Mood Generator
========================================================== */

export const detectMood = () => {
  const moods = Object.keys(moodDatabase);

  const randomMood =
    moods[Math.floor(Math.random() * moods.length)];

  return moodDatabase[randomMood];
};

/* ==========================================================
   Get Mood By Name
========================================================== */

export const getMood = (mood) => {
  return moodDatabase[mood] || moodDatabase.Neutral;
};