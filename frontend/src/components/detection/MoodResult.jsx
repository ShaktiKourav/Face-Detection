import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  MdMood,
  MdMusicNote,
  MdHistory,
  MdTrendingUp,
  MdAccessTime,
  MdCalendarToday,
} from "react-icons/md";

const MoodResult = ({ result }) => {

  /* ==========================================
      DEFAULT DATA
  ========================================== */

  const moodResult = result || {

    mood: "Happy 😊",

    confidence: 98,

    song: "Happy Vibes",

    time: new Date().toLocaleTimeString(),

    date: new Date().toLocaleDateString(),

  };

  /* ==========================================
      CONFIDENCE WIDTH
  ========================================== */

  const progress = `${moodResult.confidence}%`;

 return (
  <motion.section
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.45 }}
    className="
    relative
    overflow-hidden
    rounded-[28px]
    border
    border-[var(--border-color)]
    bg-[var(--card-bg)]
    backdrop-blur-3xl
    shadow-[var(--shadow-lg)]
    "
  >
    {/* Background Glow */}

    <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

    <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[130px]" />

    {/* =======================================================
                            HEADER
    ======================================================= */}

    <div
      className="
      relative
      flex
      items-center
      justify-between
      border-b
      border-[var(--border-color)]
      px-5
      py-4
      "
    >
      <div>

        <span
          className="
          inline-flex
          items-center
          rounded-full
          bg-gradient-to-r
          from-pink-500/15
          to-violet-500/15
          px-3
          py-1
          text-[10px]
          font-semibold
          uppercase
          tracking-[2px]
          text-pink-500
          "
        >
          Detection Result
        </span>

        <h2
          className="
          mt-3
          text-xl
          font-bold
          text-[var(--text-primary)]
          "
        >
          AI Mood Analysis
        </h2>

        <p
          className="
          mt-1
          text-xs
          text-[var(--text-secondary)]
          "
        >
          Emotion detected successfully with AI prediction
        </p>

      </div>

      <motion.div
        whileHover={{
          rotate: 8,
          scale: 1.05,
        }}
        className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-pink-500
        via-fuchsia-500
        to-violet-600
        text-white
        shadow-xl
        "
      >
        <MdMood size={28} />
      </motion.div>

    </div>

    {/* =======================================================
                        RESULT CARD
    ======================================================= */}

    <div className="relative p-5">

      <div
        className="
        overflow-hidden
        rounded-[24px]
        bg-gradient-to-r
        from-pink-500
        via-fuchsia-500
        to-violet-600
        p-5
        text-white
        shadow-[0_18px_45px_rgba(168,85,247,.28)]
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[11px] uppercase tracking-[2px] text-pink-100">

              Detected Mood

            </p>

            <h2 className="mt-2 text-3xl font-bold">

              {moodResult.mood}

            </h2>

            <p className="mt-2 text-xs text-white/90">

              Facial emotion recognized successfully

            </p>

          </div>

          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-white/15
            text-5xl
            backdrop-blur-xl
            "
          >
            😊
          </motion.div>

        </div>

        {/* Confidence */}

        <div className="mt-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs font-medium text-pink-100">

              Confidence Score

            </span>

            <span className="text-sm font-bold">

              {moodResult.confidence}%

            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/20">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: progress }}
              transition={{ duration: 1 }}
              className="
              h-full
              rounded-full
              bg-white
              shadow-[0_0_12px_rgba(255,255,255,.7)]
              "
            />

          </div>

        </div>

      </div>

      {/* =======================================================
                          DETAILS
      ======================================================= */}
            {/* =======================================================
                          DETAILS
      ======================================================= */}

      <div
        className="
        mt-5
        grid
        gap-4
        md:grid-cols-2
        "
      >

        {/* Song */}

        <motion.div
          whileHover={{ y: -3 }}
          className="
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          p-4
          backdrop-blur-xl
          transition-all
          duration-300
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-pink-500
              to-violet-600
              text-white
              shadow-lg
              "
            >
              <MdMusicNote size={20} />
            </div>

            <div>

              <p
                className="
                text-[11px]
                uppercase
                tracking-[1.5px]
                text-[var(--text-secondary)]
                "
              >
                Recommended Song
              </p>

              <h3
                className="
                mt-1
                text-base
                font-semibold
                text-[var(--text-primary)]
                "
              >
                {moodResult.song}
              </h3>

            </div>

          </div>

        </motion.div>

        {/* Prediction */}

        <motion.div
          whileHover={{ y: -3 }}
          className="
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          p-4
          backdrop-blur-xl
          transition-all
          duration-300
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-violet-500
              to-purple-600
              text-white
              shadow-lg
              "
            >
              <MdTrendingUp size={20} />
            </div>

            <div>

              <p
                className="
                text-[11px]
                uppercase
                tracking-[1.5px]
                text-[var(--text-secondary)]
                "
              >
                AI Prediction
              </p>

              <h3
                className="
                mt-1
                text-base
                font-semibold
                text-[var(--text-primary)]
                "
              >
                Excellent Accuracy
              </h3>

            </div>

          </div>

        </motion.div>

        {/* Time */}

        <motion.div
          whileHover={{ y: -3 }}
          className="
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          p-4
          backdrop-blur-xl
          transition-all
          duration-300
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              shadow-lg
              "
            >
              <MdAccessTime size={20} />
            </div>

            <div>

              <p
                className="
                text-[11px]
                uppercase
                tracking-[1.5px]
                text-[var(--text-secondary)]
                "
              >
                Detection Time
              </p>

              <h3
                className="
                mt-1
                text-base
                font-semibold
                text-[var(--text-primary)]
                "
              >
                {moodResult.time}
              </h3>

            </div>

          </div>

        </motion.div>

        {/* Date */}

        <motion.div
          whileHover={{ y: -3 }}
          className="
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          p-4
          backdrop-blur-xl
          transition-all
          duration-300
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-orange-500
              to-red-500
              text-white
              shadow-lg
              "
            >
              <MdCalendarToday size={20} />
            </div>

            <div>

              <p
                className="
                text-[11px]
                uppercase
                tracking-[1.5px]
                text-[var(--text-secondary)]
                "
              >
                Detection Date
              </p>

              <h3
                className="
                mt-1
                text-base
                font-semibold
                text-[var(--text-primary)]
                "
              >
                {moodResult.date}
              </h3>

            </div>

          </div>

        </motion.div>

      </div>
            {/* =======================================================
                          AI INSIGHT
      ======================================================= */}

      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className="
        mt-5
        rounded-[26px]
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-5
        backdrop-blur-xl
        "
      >

        <div className="flex items-center justify-between gap-4">

          <div>

            <span
              className="
              inline-flex
              rounded-full
              bg-green-500/10
              px-3
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[2px]
              text-green-500
              "
            >
              AI Insight
            </span>

            <h3
              className="
              mt-3
              text-lg
              font-bold
              text-[var(--text-primary)]
              "
            >
              Emotion Analysis Report
            </h3>

          </div>

          <div
            className="
            rounded-full
            bg-green-500/10
            px-4
            py-2
            text-xs
            font-semibold
            text-green-500
            "
          >
            Excellent
          </div>

        </div>

        <p
          className="
          mt-4
          text-sm
          leading-7
          text-[var(--text-secondary)]
          "
        >
          Based on facial landmarks, facial muscle
          movement and AI confidence scoring, the
          system predicts that your current emotion is

          <span className="font-semibold text-pink-500">

            {" "}{moodResult.mood}

          </span>

          . Personalized music recommendations are
          generated to improve your listening
          experience according to your emotional
          state.

        </p>

        <div
          className="
          mt-5
          grid
          gap-3
          sm:grid-cols-3
          "
        >

          <div
            className="
            rounded-2xl
            bg-[var(--card-bg)]
            border
            border-[var(--border-color)]
            p-3
            text-center
            "
          >

            <p className="text-[10px] uppercase tracking-[2px] text-[var(--text-secondary)]">

              Confidence

            </p>

            <h4 className="mt-2 text-lg font-bold text-[var(--text-primary)]">

              {moodResult.confidence}%

            </h4>

          </div>

          <div
            className="
            rounded-2xl
            bg-[var(--card-bg)]
            border
            border-[var(--border-color)]
            p-3
            text-center
            "
          >

            <p className="text-[10px] uppercase tracking-[2px] text-[var(--text-secondary)]">

              Mood

            </p>

            <h4 className="mt-2 text-lg font-bold text-[var(--text-primary)]">

              {moodResult.mood}

            </h4>

          </div>

          <div
            className="
            rounded-2xl
            bg-[var(--card-bg)]
            border
            border-[var(--border-color)]
            p-3
            text-center
            "
          >

            <p className="text-[10px] uppercase tracking-[2px] text-[var(--text-secondary)]">

              AI Status

            </p>

            <h4 className="mt-2 text-lg font-bold text-green-500">

              Completed

            </h4>

          </div>

        </div>

      </motion.div>

      {/* =======================================================
                      AI RECOMMENDATION
      ======================================================= */}

      <motion.div
        whileHover={{
          scale: 1.01,
        }}
        className="
        relative
        mt-5
        overflow-hidden
        rounded-[28px]
        bg-gradient-to-br
        from-pink-500
        via-fuchsia-500
        to-violet-600
        p-5
        text-white
        shadow-[0_18px_45px_rgba(168,85,247,.28)]
        "
      >

        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center justify-between gap-6">

          <div className="max-w-xl">

            <span
              className="
              inline-flex
              rounded-full
              bg-white/15
              px-3
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[2px]
              backdrop-blur-xl
              "
            >
              AI Music Recommendation
            </span>

            <h2 className="mt-4 text-2xl font-bold">

              {moodResult.song}

            </h2>

            <p className="mt-3 text-sm leading-7 text-white/90">

              This recommendation matches your
              detected emotional state and helps
              maintain a better listening experience.

            </p>

          </div>

          <motion.div
            animate={{
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-white/15
            text-5xl
            backdrop-blur-xl
            "
          >
            🎵
          </motion.div>

        </div>

      </motion.div>
            {/* =======================================================
                      ACTION BUTTONS
      ======================================================= */}

      <div
        className="
        mt-5
        flex
        flex-wrap
        gap-3
        "
      >

        <Link
          to="/music"
          className="
          flex
          items-center
          gap-2
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
          hover:shadow-xl
          "
        >
          <MdMusicNote size={20} />

          Play Music

        </Link>

        <Link
          to="/history"
          className="
          flex
          items-center
          gap-2
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
          "
        >
          <MdHistory size={20} />

          View History

        </Link>

      </div>

     

      {/* =======================================================
                          FINAL CTA
      ======================================================= */}

      <motion.div
        whileHover={{
          y: -3,
          scale: 1.01,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
        relative
        mt-5
        overflow-hidden
        rounded-[28px]
        bg-gradient-to-br
        from-pink-500
        via-fuchsia-500
        to-violet-600
        p-6
        text-white
        shadow-[0_20px_55px_rgba(168,85,247,.28)]
        "
      >

        <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">

          <span
            className="
            inline-flex
            rounded-full
            bg-white/15
            px-3
            py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-[2px]
            backdrop-blur-xl
            "
          >
            Detection Completed
          </span>

          <h2 className="mt-4 text-2xl font-bold">

            Mood Analysis Completed Successfully 🎉

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
            Your facial expression has been analyzed successfully.
            The AI predicted your mood with a high confidence score,
            securely stored the result in history and prepared
            personalized music recommendations for your current mood.

          </p>

          <div
            className="
            mt-6
            flex
            flex-wrap
            gap-3
            "
          >

            <Link
              to="/music"
              className="
              rounded-2xl
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-violet-700
              transition-all
              duration-300
              hover:scale-105
              "
            >
              Listen Now
            </Link>

            <Link
              to="/face-detection"
              className="
              rounded-2xl
              border
              border-white/20
              bg-white/10
              px-6
              py-3
              text-sm
              font-semibold
              backdrop-blur-xl
              transition-all
              duration-300
              hover:bg-white/20
              "
            >
              Detect Again
            </Link>

          </div>

        </div>

      </motion.div>

    </div>

  </motion.section>
);
};

export default MoodResult;