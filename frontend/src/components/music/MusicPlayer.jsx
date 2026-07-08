import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  MdMusicNote,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";

import {
  FaSmile,
  FaSadTear,
  FaAngry,
  FaMeh,
} from "react-icons/fa";

/* ==========================================================
        SONG PLAYLIST
   Replace src with your own mp3 files
========================================================== */

const playlists = {
  Happy: [
    {
      id: 1,
      title: "Happy Vibes",
      artist: "AI Playlist",
      mood: "Happy",
      duration: "3:21",
      image: "/images/happy.jpg",
      src: "/songs/happy1.mp3",
    },
    {
      id: 2,
      title: "Summer Energy",
      artist: "AI Playlist",
      mood: "Happy",
      duration: "2:58",
      image: "/images/happy2.jpg",
      src: "/songs/happy2.mp3",
    },
  ],

  Sad: [
    {
      id: 3,
      title: "Peaceful Rain",
      artist: "AI Playlist",
      mood: "Sad",
      duration: "4:08",
      image: "/images/sad.jpg",
      src: "/songs/sad1.mp3",
    },
    {
      id: 4,
      title: "Silent Night",
      artist: "AI Playlist",
      mood: "Sad",
      duration: "3:44",
      image: "/images/sad2.jpg",
      src: "/songs/sad2.mp3",
    },
  ],

  Angry: [
    {
      id: 5,
      title: "Calm Mind",
      artist: "Relax Music",
      mood: "Angry",
      duration: "4:20",
      image: "/images/angry.jpg",
      src: "/songs/angry1.mp3",
    },
    {
      id: 6,
      title: "Deep Breath",
      artist: "Relax Music",
      mood: "Angry",
      duration: "3:50",
      image: "/images/angry2.jpg",
      src: "/songs/angry2.mp3",
    },
  ],

  Neutral: [
    {
      id: 7,
      title: "Focus Beats",
      artist: "LoFi AI",
      mood: "Neutral",
      duration: "3:40",
      image: "/images/neutral.jpg",
      src: "/songs/neutral1.mp3",
    },
    {
      id: 8,
      title: "Morning Coding",
      artist: "LoFi AI",
      mood: "Neutral",
      duration: "3:16",
      image: "/images/neutral2.jpg",
      src: "/songs/neutral2.mp3",
    },
  ],
};

/* ==========================================================
        COMPONENT
========================================================== */

const MusicPlayer = () => {

  const audioRef = useRef(null);

  /* =======================
          STATES
  ======================= */

  const [currentMood, setCurrentMood] = useState("Happy");

  const [playlist, setPlaylist] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isRepeat, setIsRepeat] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);

  const [favorite, setFavorite] = useState(false);

  const [volume, setVolume] = useState(0.8);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  /* =======================
        LOAD MOOD
  ======================= */

  useEffect(() => {

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    if (history.length > 0) {

      const latest =
        history[history.length - 1];

      setCurrentMood(latest.mood || "Happy");

    }

  }, []);

  /* =======================
      UPDATE PLAYLIST
  ======================= */

  useEffect(() => {

    const songs =
      playlists[currentMood] || playlists.Happy;

    setPlaylist(songs);

    setCurrentIndex(0);

  }, [currentMood]);

  /* =======================
        CURRENT SONG
  ======================= */

  const currentSong = useMemo(() => {

    return playlist[currentIndex];

  }, [playlist, currentIndex]);

  /* =======================
        AUTO PLAY
  ======================= */

  useEffect(() => {

    if (!audioRef.current || !currentSong) return;

    audioRef.current.src = currentSong.src;

    audioRef.current.load();

    audioRef.current.volume = volume;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

  }, [currentSong]);

  /* =======================
        VOLUME
  ======================= */

  useEffect(() => {

    if (audioRef.current) {

      audioRef.current.volume = volume;

    }

  }, [volume]);
    /* ==========================================================
          PLAY / PAUSE
  ========================================================== */

  const togglePlay = () => {

    if (!audioRef.current) return;

    if (isPlaying) {

      audioRef.current.pause();

      setIsPlaying(false);

    } else {

      audioRef.current
        .play()
        .then(() => setIsPlaying(true));

    }

  };

  /* ==========================================================
          NEXT SONG
  ========================================================== */

  const nextSong = () => {

    if (!playlist.length) return;

    if (isShuffle) {

      const random =
        Math.floor(Math.random() * playlist.length);

      setCurrentIndex(random);

      return;

    }

    if (currentIndex === playlist.length - 1) {

      setCurrentIndex(0);

    } else {

      setCurrentIndex(currentIndex + 1);

    }

  };

  /* ==========================================================
          PREVIOUS SONG
  ========================================================== */

  const previousSong = () => {

    if (!playlist.length) return;

    if (currentIndex === 0) {

      setCurrentIndex(playlist.length - 1);

    } else {

      setCurrentIndex(currentIndex - 1);

    }

  };

  /* ==========================================================
          SONG ENDED
  ========================================================== */

  const handleSongEnd = () => {

    if (isRepeat) {

      audioRef.current.currentTime = 0;

      audioRef.current.play();

      return;

    }

    nextSong();

  };

  /* ==========================================================
          METADATA
  ========================================================== */

  const handleLoadedMetadata = () => {

    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);

  };

  /* ==========================================================
          PROGRESS UPDATE
  ========================================================== */

  const handleTimeUpdate = () => {

    if (!audioRef.current) return;

    const current =
      audioRef.current.currentTime;

    const total =
      audioRef.current.duration;

    setProgress(current);

    setDuration(total);

  };

  /* ==========================================================
          SEEK BAR
  ========================================================== */

  const handleSeek = (e) => {

    const value =
      Number(e.target.value);

    if (!audioRef.current) return;

    audioRef.current.currentTime = value;

    setProgress(value);

  };

  /* ==========================================================
          FORMAT TIME
  ========================================================== */

  const formatTime = (time) => {

    if (!time || Number.isNaN(time))
      return "00:00";

    const min =
      Math.floor(time / 60);

    const sec =
      Math.floor(time % 60);

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

  };

  /* ==========================================================
          FAVORITE
  ========================================================== */

  const toggleFavorite = () => {

    setFavorite(!favorite);

  };

  /* ==========================================================
          SHUFFLE
  ========================================================== */

  const toggleShuffle = () => {

    setIsShuffle(!isShuffle);

  };

  /* ==========================================================
          REPEAT
  ========================================================== */

  const toggleRepeat = () => {

    setIsRepeat(!isRepeat);

  };

  /* ==========================================================
          MOOD ICON
  ========================================================== */

  const MoodIcon = () => {

    switch (currentMood) {

      case "Happy":
        return (
          <FaSmile
            size={28}
            className="text-yellow-500"
          />
        );

      case "Sad":
        return (
          <FaSadTear
            size={28}
            className="text-blue-500"
          />
        );

      case "Angry":
        return (
          <FaAngry
            size={28}
            className="text-red-500"
          />
        );

      default:
        return (
          <FaMeh
            size={28}
            className="text-gray-500"
          />
        );

    }

  };

  /* ==========================================================
          AUDIO ELEMENT
  ========================================================== */

  const AudioPlayer = () => (

    <audio

      ref={audioRef}

      onEnded={handleSongEnd}

      onLoadedMetadata={handleLoadedMetadata}

      onTimeUpdate={handleTimeUpdate}

    />

  );
  /* ==========================================================
          UI
  ========================================================== */

  return (

    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="glass rounded-[28px] p-6 lg:p-8"
>

      <AudioPlayer />

      {/* ================= HEADER ================= */}

     <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

  <div>

    <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600">

      AI Music Recommendation

    </span>

    <h2 className="mt-3 text-2xl font-bold text-[var(--text-primary)]">

      Mood Based Music Player

    </h2>

    <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">

      Songs are automatically selected according to your latest detected mood.

    </p>

  </div>

  <div className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50/70 px-5 py-3">

    <MoodIcon />

    <div>

      <p className="text-[11px] uppercase tracking-wide text-[var(--text-secondary)]">

        Current Mood

      </p>

      <h3 className="text-base font-semibold text-[var(--text-primary)]">

        {currentMood}

      </h3>

    </div>

  </div>

</div>

      {/* ================= PLAYER ================= */}

      {currentSong && (

        <div className="mt-8 grid gap-10 lg:grid-cols-[330px_1fr]">

          {/* LEFT */}

          <motion.div

            animate={{
              y: [0, -10, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 5,
            }}

            className="overflow-hidden rounded-[26px] border border-pink-100 bg-white shadow-md"

          >

            <img

              src={currentSong.image}

              alt={currentSong.title}

              className="h-[320px] w-full object-cover"

            />

          </motion.div>

          {/* RIGHT */}

          <div>

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-3xl font-bold text-[var(--text-primary)]">

                  {currentSong.title}

                </h2>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">

                  {currentSong.artist}

                </p>

              </div>

              <button

                onClick={toggleFavorite}

                className="rounded-2xl border border-pink-100 bg-pink-50 p-3 transition hover:scale-105"

              >

                {favorite ? (

                  <MdFavorite

                    size={28}

                    className="text-pink-500"

                  />

                ) : (

                  <MdFavoriteBorder

                    size={28}

                    className="text-gray-500"

                  />

                )}

              </button>

            </div>

            {/* ================= PROGRESS ================= */}

            <div className="mt-8">

              <input

                type="range"

                min={0}

                max={duration || 0}

                value={progress}

                onChange={handleSeek}

                className="w-full accent-pink-500"

              />

              <div className="mt-2 flex justify-between text-xs text-[var(--text-secondary)]">

                <span>

                  {formatTime(progress)}

                </span>

                <span>

                  {formatTime(duration)}

                </span>

              </div>

            </div>

            {/* ================= CONTROLS ================= */}

            <div  className="mt-8 flex flex-wrap items-center justify-center gap-3">

              <button

                onClick={toggleShuffle}

                className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                  isShuffle
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100"
                }`}

              >

                Shuffle

              </button>

              <button

                onClick={previousSong}

                className="rounded-full bg-gray-100 p-4 transition hover:scale-105"

              >

                ⏮

              </button>

              <button

                onClick={togglePlay}

                className="rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-7 py-4 text-xl text-white shadow-xl transition hover:scale-105"

              >

                {isPlaying ? "⏸" : "▶"}

              </button>

              <button

                onClick={nextSong}

                className="rounded-full bg-gray-100 p-5 transition hover:scale-105"

              >

                ⏭

              </button>

              <button

                onClick={toggleRepeat}

                className={`rounded-2xl px-5 py-3 font-semibold transition ${
                  isRepeat
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100"
                }`}

              >

                Repeat

              </button>

            </div>

            {/* ================= VOLUME ================= */}

            <div className="mt-8">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm font-semibold text-[var(--text-primary)]">

                  Volume

                </span>

                <span>

                  {Math.round(volume * 100)}%

                </span>

              </div>

              <input

                type="range"

                min="0"

                max="1"

                step="0.01"

                value={volume}

                onChange={(e)=>setVolume(Number(e.target.value))}

                className="w-full accent-violet-600"

              />

            </div>

          </div>

        </div>

      )}

      {/* ==========================================================
              PLAYLIST
      ========================================================== */}

      <div className="mt-12">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold text-[var(--text-primary)]">

              Recommended Playlist

            </h3>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">

              Songs selected according to your detected mood.

            </p>

          </div>

          <div className="rounded-xl border border-pink-100 bg-pink-50 px-4 py-2">

            <span className="font-semibold text-pink-600">

              {playlist.length} Songs

            </span>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {playlist.map((song, index) => (

            <motion.div

              key={song.id}

              whileHover={{
                y: -5,
                scale: 1.02,
              }}

              onClick={() => setCurrentIndex(index)}

              className={`cursor-pointer rounded-[24px] border p-4 transition

              ${
                currentIndex === index
                  ? "border-pink-400 bg-pink-50"
                  : "border-white bg-white"
              }

              shadow-sm hover:shadow-xl

              `}

            >

              <div className="flex items-center gap-5">

                <img

                  src={song.image}

                  alt={song.title}

                  className="h-16 w-16 rounded-2xl object-cover"

                />

                <div className="flex-1">

                  <h4 className="text-base font-bold">

                    {song.title}

                  </h4>

                  <p className="mt-1 text-xs text-gray-500">

                    {song.artist}

                  </p>

                  <div className="mt-3 flex items-center gap-3">

                    <span className="rounded-full bg-pink-100 px-2.5 py-1 text-[11px] text-xs font-semibold text-pink-600">

                      {song.mood}

                    </span>

                    <span className="text-[11px] text-gray-400">

                      {song.duration}

                    </span>

                  </div>

                </div>

                {currentIndex === index && (

                  <div className="rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-3 text-white">

                    <MdMusicNote size={24} />

                  </div>

                )}

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      {/* ==========================================================
              AI RECOMMENDATION
      ========================================================== */}

      <motion.div

        whileHover={{
          scale: 1.01,
        }}

       className="mt-10 overflow-hidden rounded-[28px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-7 text-white shadow-xl"

      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider">

              AI Recommendation

            </span>

            <h2 className="mt-4 text-2xl font-bold">

              Enjoy Music Based On Your Mood

            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90">

              Every time a new mood is detected, the AI automatically
              selects a suitable playlist to improve your listening
              experience and emotional well-being.

            </p>

          </div>

          <div className="rounded-[24px] bg-white/20 p-6 backdrop-blur-xl">

            <MdMusicNote size={56} />

          </div>

        </div>

      </motion.div>

    </motion.div>

  );

};

export default MusicPlayer;