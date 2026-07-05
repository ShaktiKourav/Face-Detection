import { motion } from "framer-motion";
import {
  MdPlayArrow,
  MdFavoriteBorder,
  MdMusicNote,
} from "react-icons/md";

const playlists = [
  {
    mood: "Happy",
    emoji: "😊",
    color: "from-yellow-400 to-orange-500",
    songs: "Happy Vibes Playlist",
    tracks: "25 Tracks",
  },
  {
    mood: "Romantic",
    emoji: "❤️",
    color: "from-rose-500 to-red-500",
    songs: "Love Melody",
    tracks: "22 Tracks",
  },
  {
    mood: "Sad",
    emoji: "😔",
    color: "from-blue-500 to-cyan-500",
    songs: "Silent Memories",
    tracks: "18 Tracks",
  },
  {
    mood: "Angry",
    emoji: "😡",
    color: "from-red-500 to-orange-500",
    songs: "Power Mode",
    tracks: "20 Tracks",
  },
  {
    mood: "Calm",
    emoji: "😌",
    color: "from-cyan-500 to-teal-500",
    songs: "Peaceful Mind",
    tracks: "24 Tracks",
  },
  {
    mood: "Excited",
    emoji: "🤩",
    color: "from-yellow-400 to-pink-500",
    songs: "Energy Boost",
    tracks: "28 Tracks",
  },
  {
    mood: "Relaxed",
    emoji: "🌿",
    color: "from-green-500 to-emerald-500",
    songs: "Nature Flow",
    tracks: "19 Tracks",
  },
  {
    mood: "Surprised",
    emoji: "😲",
    color: "from-purple-500 to-fuchsia-500",
    songs: "Unexpected Beat",
    tracks: "21 Tracks",
  },
  {
    mood: "Confident",
    emoji: "😎",
    color: "from-amber-500 to-yellow-500",
    songs: "Champion Spirit",
    tracks: "27 Tracks",
  },
  {
    mood: "Focused",
    emoji: "🎯",
    color: "from-slate-600 to-gray-700",
    songs: "Deep Focus",
    tracks: "30 Tracks",
  },
  {
    mood: "Neutral",
    emoji: "😐",
    color: "from-violet-500 to-fuchsia-500",
    songs: "Lo-Fi Focus",
    tracks: "26 Tracks",
  },
  {
    mood: "Sleep",
    emoji: "😴",
    color: "from-indigo-500 to-violet-600",
    songs: "Deep Sleep",
    tracks: "15 Tracks",
  },
  {
    mood: "Motivated",
    emoji: "💪",
    color: "from-orange-500 to-red-500",
    songs: "Motivation Hits",
    tracks: "24 Tracks",
  },
  {
    mood: "Party",
    emoji: "🥳",
    color: "from-pink-500 to-fuchsia-500",
    songs: "Party Night",
    tracks: "35 Tracks",
  },
  {
    mood: "Energetic",
    emoji: "⚡",
    color: "from-yellow-500 to-orange-600",
    songs: "Workout Beats",
    tracks: "29 Tracks",
  },
  {
    mood: "Dreamy",
    emoji: "☁️",
    color: "from-sky-400 to-indigo-500",
    songs: "Dream Escape",
    tracks: "17 Tracks",
  },
  {
    mood: "Fear",
    emoji: "😨",
    color: "from-gray-500 to-slate-700",
    songs: "Comfort Zone",
    tracks: "16 Tracks",
  },
  {
    mood: "Lonely",
    emoji: "🥀",
    color: "from-indigo-500 to-blue-700",
    songs: "Lonely Nights",
    tracks: "18 Tracks",
  },
  {
    mood: "Hopeful",
    emoji: "🌈",
    color: "from-pink-400 to-violet-500",
    songs: "Bright Tomorrow",
    tracks: "23 Tracks",
  },
  {
    mood: "Meditation",
    emoji: "🧘",
    color: "from-teal-500 to-emerald-500",
    songs: "Meditation Sounds",
    tracks: "20 Tracks",
  },
];

const Music = () => {
  return (
    <div className="space-y-4">
      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)] py-2">
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

        <div className="flex  flex-col lg:flex-row lg:items-center lg:justify-between ">
          <div >
            <h1 className="text-2xl font-bold">
              Music{" "}
              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                Recommendation
              </span>
            </h1>

            <p className="mt-0 text-xs text-gray-500">
              Enjoy mood-based playlists recommended after face detection.
            </p>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 shadow-xl">
            <MdMusicNote className="text-white" size={40} />
          </div>
        </div>
      </div>

      {/* Current Mood */}

      <div className="rounded-3xl border border-white/80 bg-gradient-to-r from-pink-500 to-violet-600 p-5 text-white shadow-xl">
        <p className="text-sm font-semibold">Current Recommended Mood</p>

        <h2 className="mt-1 text-4xl font-bold">
          😊 Happy
        </h2>

        <p className="mt-2 opacity-90 text-gray-100 text-xs ">
          Based on the latest face detection result.
        </p>
      </div>

      {/* Playlist */}

      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {playlists.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]"
          >
            {/* Top */}

            <div
              className={`bg-gradient-to-r ${item.color} p-6 text-white`}
            >
              <div className="text-5xl font-semibold">
                {item.emoji}
              </div>

              <h2 className="mt-3 text-2xl font-bold">
                {item.mood}
              </h2>
            </div>

            {/* Content */}

            <div className="p-7 pt-5">
              <h3 className="text-xl font-semibold">
                {item.songs}
              </h3>

              <p className="mt-2 text-gray-500">
                {item.tracks}
              </p>

              <div className="mt-6 flex gap-3">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 font-semibold text-white transition hover:scale-105">
                  <MdPlayArrow size={22} />
                  Play
                </button>

                <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-200 text-pink-500 transition hover:bg-pink-50">
                  <MdFavoriteBorder size={22} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Music;