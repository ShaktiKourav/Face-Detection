import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  MdWavingHand,
  MdCalendarToday,
  MdAccessTime,
  MdFaceRetouchingNatural,
  MdArrowForward,
} from "react-icons/md";

import { Link } from "react-router-dom";

const WelcomeCard = () => {
  const [time, setTime] = useState(new Date());

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();

  
  
return (
  
 <motion.section
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="
  relative
  overflow-hidden
  rounded-[28px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  shadow-[var(--shadow-lg)]
  backdrop-blur-3xl
"
>
  {/* Glow */}

  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

  <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

  <div className="relative grid gap-8 lg:grid-cols-[1.45fr_.9fr] p-6 xl:p-8">

    {/* LEFT */}

    <div className="flex flex-col justify-center">

      <span
        className="
        w-fit
        rounded-full
        bg-gradient-to-r
        from-pink-500/15
        to-violet-500/15
        px-3
        py-1.5
        text-[10px]
        font-bold
        uppercase
        tracking-[2px]
        text-pink-500
      "
      >
        AI Dashboard
      </span>

      <h1
  className="
    mt-4
    text-3xl
    xl:text-4xl
    font-extrabold
    leading-tight
    text-[var(--text-primary)]
  "
>
  Welcome Back,
  
</h1>

      <div className="mt-2 flex items-center gap-2">


        <h2
          className="
          text-xl
          font-bold
          text-[var(--primary)]
        "
        >
          {user.name || "Guest"}
        </h2>

      </div>

      <p
        className="
        mt-4
        max-w-xl
        text-sm
        leading-7
        text-[var(--text-secondary)]
      "
      >
        Welcome to your AI MoodSense dashboard. Monitor
        live face detection, AI emotion prediction,
        smart music recommendations and analytics from
        one intelligent workspace.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">

        <Link
          to="/detection"
          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-violet-600
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
        "
        >
          Start Detection

          <MdArrowForward size={18} />

        </Link>

        <Link
          to="/history"
          className="
          rounded-xl
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          px-5
          py-3
          text-sm
          font-semibold
          text-[var(--text-primary)]
          transition
          hover:bg-[var(--hover)]
        "
        >
          View History
        </Link>

      </div>

    </div>
        {/* ================= RIGHT ================= */}

    <div className="flex flex-col justify-center gap-4">

      {/* Date Card */}

      <div
        className="
        rounded-2xl
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        backdrop-blur-xl
      "
      >

        <div className="flex items-center gap-4">

          <div
            className="
            flex
            h-12
            w-12
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
            <MdCalendarToday size={22} />
          </div>

          <div>

            <p className="text-xs text-[var(--text-secondary)]">

              Today's Date

            </p>

            <h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">

              {time.toLocaleDateString()}

            </h3>

          </div>

        </div>

      </div>

      {/* Time Card */}

      <div
        className="
        rounded-2xl
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        backdrop-blur-xl
      "
      >

        <div className="flex items-center gap-4">

          <div
            className="
            flex
            h-12
            w-12
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
            <MdAccessTime size={22} />
          </div>

          <div>

            <p className="text-xs text-[var(--text-secondary)]">

              Live Time

            </p>

            <h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">

              {time.toLocaleTimeString()}

            </h3>

          </div>

        </div>

      </div>

      {/* AI Engine */}

      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
        rounded-3xl
        bg-gradient-to-r
        from-pink-500
        via-fuchsia-500
        to-violet-600
        p-5
        text-white
        shadow-[0_20px_50px_rgba(168,85,247,.25)]
      "
      >

        <div className="flex items-center justify-between">

          <div>

            <span
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/20
              px-3
              py-1
              text-[11px]
              font-medium
            "
            >

              <span className="h-2 w-2 rounded-full bg-green-300 animate-pulse" />

              AI Engine Online

            </span>

            <h2 className="mt-4 text-2xl font-bold">

              Ready

            </h2>

            <p className="mt-2 text-sm leading-6 text-white/90">

              Face detection model is active and ready
              for real-time emotion recognition.

            </p>

          </div>

          <div
            className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-2xl
            bg-white/15
            backdrop-blur-xl
          "
          >

            <MdFaceRetouchingNatural size={48} />

          </div>

        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-full rounded-full bg-white"
          />

        </div>

      </motion.div>

    </div>

  </div>

</motion.section>
)
}
export default WelcomeCard;