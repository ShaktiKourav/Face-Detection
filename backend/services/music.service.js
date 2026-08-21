import axios from "axios";

/* ==========================================================
   Mood → Genre Mapping
========================================================== */

const moodGenreMap = {
  Happy: ["pop", "dance", "party"],
  Sad: ["acoustic", "piano", "sad"],
  Angry: ["rock", "metal", "workout"],
  Neutral: ["lofi", "chill", "focus"],
  Fear: ["ambient", "calm"],
  Surprise: ["trending", "electronic"],
  Disgust: ["relax", "instrumental"],

  happy: ["pop", "dance", "party"],
  sad: ["acoustic", "piano", "sad"],
  angry: ["rock", "metal", "workout"],
  neutral: ["lofi", "chill", "focus"],
  fear: ["ambient", "calm"],
  surprise: ["trending", "electronic"],
  disgust: ["relax", "instrumental"],
};

/* ==========================================================
   Get Songs
========================================================== */

export const getSongsByMood = async (mood = "Happy") => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      throw new Error("YOUTUBE_API_KEY is missing");
    }

    const genres = moodGenreMap[mood] || ["music"];

    const query = genres.join(" ");

    const url = "https://www.googleapis.com/youtube/v3/search";

    const { data } = await axios.get(url, {
      params: {
        key: apiKey,
        part: "snippet",
        q: `${query} music playlist`,
        maxResults: 12,
        type: "video",
        videoCategoryId: "10",
      },
    });

    const songs = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
      mood,
    }));

    return songs;
  } catch (error) {
    console.error("Music Service Error:", error.message);

    throw error;
  }
};

/* ==========================================================
   Random Song
========================================================== */

export const getRandomSong = async (mood = "Happy") => {
  const songs = await getSongsByMood(mood);

  if (!songs.length) return null;

  const index = Math.floor(Math.random() * songs.length);

  return songs[index];
};

/* ==========================================================
   Mood List
========================================================== */

export const getSupportedMoods = () => {
  return Object.keys(moodGenreMap).filter(
    (item) => item[0] === item[0].toUpperCase()
  );
};

export default {
  getSongsByMood,
  getRandomSong,
  getSupportedMoods,
};