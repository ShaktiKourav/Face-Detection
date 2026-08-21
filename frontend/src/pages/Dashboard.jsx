


import { useEffect, useState } from "react";
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
import api from "../services/api";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  /* ==========================================
     FETCH DETECTION HISTORY
  ========================================== */

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        const response = await api.get("/detection/history");

        console.log("Dashboard History:", response.data);

        if (response.data?.success) {
          setHistory(response.data.history || []);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch detection history:",
          error
        );

        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  /* ==========================================
     TOTAL HISTORY RECORDS
  ========================================== */

  const totalRecords = history.length;

  /* ==========================================
     TODAY'S DETECTIONS
  ========================================== */

  const today = new Date();

  const todayDetections = history.filter((item) => {
    if (!item.createdAt) return false;

    const detectionDate = new Date(item.createdAt);

    return (
      detectionDate.getDate() === today.getDate() &&
      detectionDate.getMonth() === today.getMonth() &&
      detectionDate.getFullYear() === today.getFullYear()
    );
  });

  const todayCount = todayDetections.length;

  /* ==========================================
     LATEST MOOD
  ========================================== */

  const latestDetection = history.length
    ? history[0]
    : null;

  const latestMood =
    latestDetection?.mood || "Neutral";

  /* ==========================================
     MOOD COLOR
  ========================================== */

  const moodColor =
    latestMood === "Happy"
      ? "from-green-500 to-emerald-600"
      : latestMood === "Sad"
      ? "from-blue-500 to-cyan-600"
      : latestMood === "Angry"
      ? "from-red-500 to-orange-600"
      : latestMood === "Surprised"
      ? "from-yellow-500 to-amber-600"
      : latestMood === "Fear"
      ? "from-purple-500 to-indigo-600"
      : latestMood === "Disgust"
      ? "from-lime-500 to-green-600"
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
        {/* CAMERA */}

        <StatsCard
          title="Camera Status"
          value="Online"
          icon={<MdCameraAlt size={24} />}
          color="from-pink-500 to-violet-600"
          change="Ready"
          trend="up"
          description="Camera Ready"
        />

        {/* TODAY'S FACES */}

        <StatsCard
          title="Faces Detected"
          value={loading ? "..." : todayCount}
          icon={
            <MdFaceRetouchingNatural size={24} />
          }
          color="from-violet-500 to-purple-600"
          change={
            todayCount > 0
              ? `${todayCount} today`
              : "0 today"
          }
          trend="up"
          description="Today's Count"
        />

        {/* TOTAL HISTORY */}

        <StatsCard
          title="History Records"
          value={loading ? "..." : totalRecords}
          icon={<MdHistory size={24} />}
          color="from-orange-500 to-red-500"
          change={`${totalRecords} records`}
          trend="up"
          description="Stored Results"
        />

        {/* CURRENT MOOD */}

        <StatsCard
          title="Current Mood"
          value={
            loading
              ? "..."
              : latestMood
          }
          icon={<FaMusic size={22} />}
          color={moodColor}
          change={
            latestDetection
              ? `${latestDetection.confidence || 0}%`
              : "No data"
          }
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

              Your workspace is connected with AI Face
              Detection, Emotion Recognition, Music
              Recommendation and secure Authentication.
            </p>
          </div>

          <div
            className="
              min-w-[220px]
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
            "
          >
            <div className="flex items-center justify-center gap-2">
              <span className="h-3 w-3 animate-pulse rounded-full bg-green-300" />

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