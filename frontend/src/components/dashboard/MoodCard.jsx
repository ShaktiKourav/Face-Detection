import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  MdMood,
  MdHistory,
  MdMusicNote,
  MdTrendingUp,
  MdArrowForward,
} from "react-icons/md";

const MoodCard = () => {
  /* ===================================================
      STATE
  =================================================== */

  const [moodData, setMoodData] = useState({
    mood: "Happy 😊",
    confidence: 98,
    lastScan: "--:--",
    song: "Happy Vibes",
    totalToday: 12,
  });

  /* ===================================================
      LOAD HISTORY
  =================================================== */

  useEffect(() => {
    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    if (history.length) {
      const latest = history[history.length - 1];

      setMoodData({
        mood: latest.mood || "Happy 😊",
        confidence: latest.confidence || 98,
        lastScan:
          latest.time ||
          new Date().toLocaleTimeString(),

        song:
          latest.song ||
          "Happy Playlist",

        totalToday: history.length,
      });
    }
  }, []);
/* ==========================================
      CONFIDENCE WIDTH
========================================== */

const confidenceWidth = `${moodData.confidence}%`;
return (
  <motion.section
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="
      relative
      overflow-hidden
      rounded-[30px]
      border
      border-[var(--border-color)]
      bg-[var(--card-bg)]
      backdrop-blur-3xl
      shadow-[var(--shadow-lg)]
    "
  >
    {/* =========================
            Background Glow
    ========================== */}

    <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-pink-500/10 blur-[130px]" />

    <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

    <div className="relative p-6 xl:p-7">

      {/* =========================
              Header
      ========================== */}

      <div className="flex flex-wrap items-start justify-between gap-5">

        <div>

          <span
            className="
              rounded-full
              bg-gradient-to-r
              from-pink-500/10
              to-violet-500/10
              px-3
              py-1.5
              text-[11px]
              font-bold
              uppercase
              tracking-[2px]
              text-pink-500
            "
          >
            Live Mood
          </span>

          <h2
            className="
              mt-3
              text-2xl
              font-bold
              text-[var(--text-primary)]
            "
          >
            Current Emotion
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-[14px]
              leading-6
              text-[var(--text-secondary)]
            "
          >
            AI detected your latest facial expression
            with emotion recognition and confidence
            analysis.
          </p>

        </div>

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            via-fuchsia-500
            to-violet-600
            text-white
            shadow-xl
          "
        >
          <MdMood size={32} />
        </div>

      </div>

      {/* =========================
            Current Mood Banner
      ========================== */}

      <div
        className="
          relative
          mt-7
          overflow-hidden
          rounded-[28px]
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-violet-600
          p-6
          text-white
        "
      >

        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center justify-between gap-5">

          <div>

            <p className="text-sm text-pink-100">
              Current Mood
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {moodData.mood}
            </h2>

            <p className="mt-2 text-sm text-white/80">
              AI prediction based on facial landmarks
            </p>

          </div>

          <div className="text-7xl opacity-90">
            😊
          </div>

        </div>

        {/* Confidence */}

        <div className="mt-7">

          <div className="mb-2 flex items-center justify-between text-sm">

            <span>Confidence Score</span>

            <span className="font-semibold">
              {moodData.confidence}%
            </span>

          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-white/20">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: confidenceWidth }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-white"
            />

          </div>

        </div>

      </div>

      {/* =========================
              Quick Stats
      ========================== */}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
                {/* Today's Detection */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
            rounded-3xl
            border
            border-[var(--border-color)]
            bg-[var(--glass)]
            p-5
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-pink-300
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-pink-500
                to-fuchsia-500
                text-white
                shadow-lg
              "
            >
              <MdTrendingUp size={26} />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                Today's Detection
              </p>

              <h3 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                {moodData.totalToday}
              </h3>

              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Faces analyzed today
              </p>

            </div>

          </div>
        </motion.div>

        {/* Last Scan */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
            rounded-3xl
            border
            border-[var(--border-color)]
            bg-[var(--glass)]
            p-5
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-violet-300
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-violet-500
                to-purple-600
                text-white
                shadow-lg
              "
            >
              <MdHistory size={26} />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                Last Scan
              </p>

              <h3 className="mt-1 text-lg font-bold text-[var(--text-primary)]">
                {moodData.lastScan}
              </h3>

              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Latest detection time
              </p>

            </div>

          </div>
        </motion.div>

        {/* Recommended Music */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
            rounded-3xl
            border
            border-[var(--border-color)]
            bg-[var(--glass)]
            p-5
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-cyan-300
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                text-white
                shadow-lg
              "
            >
              <MdMusicNote size={26} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                Recommended Music
              </p>

              <h3 className="mt-1 truncate text-lg font-bold text-[var(--text-primary)]">
                {moodData.song}
              </h3>

              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                AI personalized playlist
              </p>

            </div>

          </div>
        </motion.div>

      </div>
      {/* =======================================
              AI INSIGHT
      ======================================= */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .45 }}
        className="
          mt-6
          rounded-[28px]
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          p-6
          backdrop-blur-xl
        "
      >

        <div className="flex items-start gap-5">

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-pink-500
              via-fuchsia-500
              to-violet-600
              text-white
              shadow-lg
            "
          >
            <MdTrendingUp size={28} />
          </div>

          <div className="flex-1">

            <span
              className="
                rounded-full
                bg-pink-500/10
                px-3
                py-1
                text-[11px]
                font-bold
                uppercase
                tracking-[2px]
                text-pink-500
              "
            >
              AI Insight
            </span>

            <h3
              className="
                mt-3
                text-xl
                font-bold
                text-[var(--text-primary)]
              "
            >
              Emotion Analysis Result
            </h3>

            <p
              className="
                mt-3
                leading-7
                text-[14px]
                text-[var(--text-secondary)]
              "
            >
              Your latest facial expression represents a
              positive emotional state with a very high
              confidence score. The AI engine detected
              stable facial landmarks, natural eye
              movement and a genuine smile, indicating
              a reliable prediction suitable for
              personalized recommendations.
            </p>

          </div>

        </div>

      </motion.div>

      {/* =======================================
              Mood Details
      ======================================= */}

      <div
        className="
          mt-6
          grid
          gap-4
          lg:grid-cols-2
        "
      >

        {/* Mood Analysis */}

        <motion.div
          whileHover={{ y: -4 }}
          className="
            rounded-[26px]
            border
            border-[var(--border-color)]
            bg-[var(--glass)]
            p-6
            backdrop-blur-xl
            transition-all
            duration-300
          "
        >

          <h3
            className="
              text-lg
              font-bold
              text-[var(--text-primary)]
            "
          >
            Mood Analysis
          </h3>

          <p
            className="
              mt-4
              text-[14px]
              leading-7
              text-[var(--text-secondary)]
            "
          >
            AI evaluated facial landmarks, eyebrow
            position, eye openness and smile intensity
            to classify your emotional state. The
            confidence score indicates the prediction
            is highly reliable under current lighting
            conditions.
          </p>

        </motion.div>

        {/* Recommendation */}

        <motion.div
          whileHover={{ y: -4 }}
          className="
            rounded-[26px]
            border
            border-[var(--border-color)]
            bg-[var(--glass)]
            p-6
            backdrop-blur-xl
            transition-all
            duration-300
          "
        >

          <h3
            className="
              text-lg
              font-bold
              text-[var(--text-primary)]
            "
          >
            AI Recommendation
          </h3>

          <p
            className="
              mt-4
              text-[14px]
              leading-7
              text-[var(--text-secondary)]
            "
          >
            Continue with upbeat music and maintain
            natural interaction for improved facial
            recognition. Regular scans help generate
            more accurate mood trends and personalized
            music suggestions over time.
          </p>

        </motion.div>

      </div>
      {/* =======================================
              ACTION BUTTONS
      ======================================= */}

      <div
        className="
          mt-7
          flex
          flex-wrap
          gap-4
        "
      >

        <Link
          to="/music"
          className="
            inline-flex
            items-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            via-fuchsia-500
            to-violet-600
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
          "
        >

          <MdMusicNote size={20} />

          Play Recommended Music

          <MdArrowForward size={18} />

        </Link>

        <Link
          to="/history"
          className="
            inline-flex
            items-center
            gap-3
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--glass)]
            px-6
            py-3
            text-sm
            font-semibold
            text-[var(--text-primary)]
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-pink-300
            hover:bg-[var(--hover)]
          "
        >

          <MdHistory size={20} />

          View Detection History

        </Link>

      </div>

      {/* =======================================
              PREMIUM CTA
      ======================================= */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="
          relative
          mt-7
          overflow-hidden
          rounded-[30px]
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-violet-600
          p-7
          text-white
          shadow-2xl
        "
      >

        {/* Glow */}

        <div
          className="
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-white/10
            blur-[120px]
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div>

            <span
              className="
                rounded-full
                bg-white/20
                px-3
                py-1
                text-xs
                font-semibold
                uppercase
                tracking-[2px]
              "
            >
              AI Recommendation
            </span>

            <h2 className="mt-4 text-3xl font-bold">

              Mood Based Playlist Ready 🎵

            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-white/90
              "
            >
              Based on your detected emotion,
              AI has prepared a personalized
              playlist to improve your mood,
              productivity and overall experience.
            </p>

          </div>

          <Link
            to="/music"
            className="
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-6
              py-3
              font-semibold
              text-violet-700
              transition-all
              duration-300
              hover:scale-105
            "
          >

            Open Music

            <MdArrowForward />

          </Link>

        </div>

      </motion.div>

     </div>
  
  </motion.section>


 );
};

export default MoodCard;
