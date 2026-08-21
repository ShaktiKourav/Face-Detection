import { useEffect, useRef, useState } from "react";
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

const API_URL = import.meta.env.VITE_API_URL;

/* ==========================================================
        COMPONENT
========================================================== */

const MusicPlayer = ({ song }) => {
  const audioRef = useRef(null);

  /* =======================
          STATES
  ======================= */

  const [isPlaying, setIsPlaying] = useState(false);

  const [isRepeat, setIsRepeat] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);

  const [favorite, setFavorite] = useState(false);

  const [volume, setVolume] = useState(0.8);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const currentMood =
  song?.mood
    ? song.mood.charAt(0).toUpperCase() + song.mood.slice(1)
    : "Happy";

 
  /* =======================
        CURRENT SONG
  ======================= */

  const currentSong = song;

  /* =======================
        AUTO PLAY
  ======================= */

useEffect(() => {
  if (!audioRef.current || !currentSong?.audio) return;

  audioRef.current.pause();

 audioRef.current.src =
  `${API_URL}${currentSong.audio}`;

  audioRef.current.load();

  audioRef.current.volume = volume;

  audioRef.current.play()
    .then(() => {
      setIsPlaying(true);
    })
    .catch((err) => {
      console.log("Autoplay blocked:", err);
      setIsPlaying(false);
    });

}, [currentSong, volume]);

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
  .then(() => setIsPlaying(true))
  .catch(console.error);

    }

  };

  /* ==========================================================
          NEXT SONG
  ========================================================== */

 const nextSong = () => {
  if (!audioRef.current) return;

  audioRef.current.currentTime = 0;
  audioRef.current.play();
};



  /* ==========================================================
          PREVIOUS SONG
  ========================================================== */

const previousSong = () => {
  if (!audioRef.current) return;

  audioRef.current.currentTime = 0;
  audioRef.current.play();
};

 
  /* ==========================================================
          SONG ENDED
  ========================================================== */

 const handleSongEnd = () => {
  if (!audioRef.current) return;

  if (isRepeat) {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  } else {
    setIsPlaying(false);
    setProgress(0);
  }
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
  preload="metadata"
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
  src={
    currentSong.image
      ? `${API_URL}${currentSong.image}`
      : `${API_URL}/images/default.jpg`
  }

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