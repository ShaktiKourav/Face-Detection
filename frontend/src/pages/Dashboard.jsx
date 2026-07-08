import { motion } from "framer-motion";

import {
  MdCameraAlt,
  MdFaceRetouchingNatural,
  MdHistory,
} from "react-icons/md";

import { FaMusic } from "react-icons/fa";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import MoodCard from "../components/dashboard/MoodCard";
import ProjectInfo from "../components/dashboard/ProjectInfo";

const Dashboard = () => {
  const history =
    JSON.parse(localStorage.getItem("history")) || [];

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const latestMood =
    history.length > 0
      ? history[history.length - 1].mood
      : "Happy 😊";

  const moodColor = latestMood.includes("Happy")
    ? "from-green-500 to-emerald-600"
    : latestMood.includes("Sad")
    ? "from-blue-500 to-cyan-600"
    : latestMood.includes("Angry")
    ? "from-red-500 to-orange-600"
    : latestMood.includes("Surprise")
    ? "from-yellow-500 to-amber-600"
    : "from-pink-500 to-violet-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-5"
    >
      {/* =======================================
                WELCOME
      ======================================= */}

      <WelcomeCard />

      {/* =======================================
                LIVE STATS
      ======================================= */}

      <section
        className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2

        xl:grid-cols-4
      "
      >
        <StatsCard
          title="Camera Status"
          value="Online"
          icon={<MdCameraAlt size={24} />}
          color="from-pink-500 to-violet-600"
          change="+100%"
          trend="up"
          description="Camera Ready"
        />

        <StatsCard
          title="Faces Detected"
          value={history.length}
          icon={<MdFaceRetouchingNatural size={24} />}
          color="from-violet-500 to-purple-600"
          change="+24%"
          trend="up"
          description="Today's Count"
        />

        <StatsCard
          title="History Records"
          value={history.length}
          icon={<MdHistory size={24} />}
          color="from-orange-500 to-red-500"
          change="+18%"
          trend="up"
          description="Stored Results"
        />

        <StatsCard
          title="Current Mood"
          value={latestMood}
          icon={<FaMusic size={22} />}
          color={moodColor}
          change="+12%"
          trend="up"
          description="Latest AI Prediction"
        />
      </section>

      {/* =======================================
                MOOD ANALYSIS
      ======================================= */}

      <MoodCard />

      {/* =======================================
                PROJECT INFO
      ======================================= */}

      <ProjectInfo />

      {/* =======================================
                  FOOTER
      ======================================= */}
      <footer
  className="
  overflow-hidden
  rounded-[28px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  shadow-[var(--shadow)]
  backdrop-blur-3xl
"
>

  <div
    className="
    flex
    flex-col
    gap-8
    p-6

    lg:flex-row
    lg:items-center
    lg:justify-between
  "
  >

    {/* Left */}

    <div>

      <span
        className="
        rounded-full
        bg-pink-500/10
        px-3
        py-1
        text-[11px]
        font-semibold
        uppercase
        tracking-widest
        text-pink-500
      "
      >
        Dashboard Information
      </span>

      <h3
        className="
        mt-4
        text-2xl
        font-bold
        text-[var(--text-primary)]
      "
      >
        AI MoodSense Dashboard
      </h3>

      <p
        className="
        mt-3
        max-w-2xl
        text-sm
        leading-7
        text-[var(--text-secondary)]
      "
      >
        Welcome back

        <span className="mx-1 font-semibold text-pink-500">

          {user.email || "Guest"}

        </span>

        Your workspace is connected with AI Face Detection,
        Emotion Recognition, Music Recommendation and secure
        Authentication.
      </p>

    </div>

    {/* Right */}

    <div
      className="
      rounded-3xl
      bg-gradient-to-r
      from-pink-500
      via-fuchsia-500
      to-violet-600
      px-7
      py-5
      text-center
      text-white
      shadow-xl
      min-w-[220px]
    "
    >

      <div className="flex items-center justify-center gap-2">

        <span className="h-3 w-3 rounded-full bg-green-300 animate-pulse" />

        <span className="text-sm">

          System Status

        </span>

      </div>

      <h2 className="mt-3 text-3xl font-bold">

        Online

      </h2>

      <p className="mt-2 text-sm text-white/90">

        Everything is working perfectly.

      </p>

    </div>

  </div>

  <div
    className="
    border-t
    border-[var(--border-color)]
    px-6
    py-5
  "
  >

    <div
      className="
      flex
      flex-col
      gap-3

      text-sm

      text-[var(--text-secondary)]

      lg:flex-row
      lg:items-center
      lg:justify-between
    "
    >

      <span>

        © {new Date().getFullYear()} AI MoodSense

      </span>

      <span>

        Face Detection • Emotion Analysis • Music Recommendation

      </span>

      <span>

        Developed by

        <span className="ml-1 font-semibold text-pink-500">

          Shakti Kourav

        </span>

      </span>

    </div>

  </div>

</footer>
    </motion.div>
  );
};

export default Dashboard;