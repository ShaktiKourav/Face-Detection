
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import DashboardCard from "../components/DashboardCard";
import Camera from "../components/Camera";

import {
  MdCameraAlt,
  MdHistory,
  MdFaceRetouchingNatural,
  MdOutlineAccessTime,
} from "react-icons/md";

import {
  FaMusic,
  FaPlayCircle,
  FaCheckCircle,
} from "react-icons/fa";

const Dashboard = () => {

  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());

  const [stats, setStats] = useState({
    detected: 158,
    history: 248,
    mood: "Happy 😊",
    camera: "Online",
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    setStats({
      detected: history.length || 158,
      history: history.length || 248,
      mood: "Happy 😊",
      camera: "Online",
    });

    setActivities([
      {
        title: "Face Detected Successfully",
        time: "Today • 10:25 AM",
        status: "Success",
        color: "green",
      },
      {
        title: "Happy Playlist Generated",
        time: "Today • 10:20 AM",
        status: "Music",
        color: "pink",
      },
      {
        title: "History Updated",
        time: "Today • 09:55 AM",
        status: "Saved",
        color: "blue",
      },
    ]);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="space-y-2">

      {/* ================= HEADER ================= */}

      <motion.section

        initial={{ opacity: 0, y: 25 }}

        animate={{ opacity: 1, y: 0 }}

        className="rounded-[30px] border border-white/80 bg-white/70 p-6 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl py-3"

      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-pink-100 px-4 py-1 text-xs  tracking-wider text-pink-600">
              AI Face Detection Dashboard
            </span>

            <h1 className="mt-2 text-2xl font-bold">

              Welcome Back,

              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">

                {" "}Shakti 👋

              </span>

            </h1>

            <p className="mt-0 max-w-2xl text-sm leading-5 text-gray-500">

              Monitor your live face detection system,
              detection history and AI powered recommendations
              from one premium dashboard.

            </p>

          </div>

          <div className="rounded-3xl bg-pink-50 px-6 py-5">

            <div className="flex items-center gap-3">

              <MdOutlineAccessTime
                className="text-pink-500"
                size={26}
              />

              <div>

                <p className="text-xs text-gray-500">
                  Current Time
                </p>

                <h3 className="font-bold">
                  {currentTime.toLocaleTimeString()}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </motion.section>

      

      {/* ================= MAIN CONTENT ================= */}

      <section className="grid gap-6 xl:grid-cols-12 pt-6 pb-4">

        {/* Camera */}

        <div className="xl:col-span-8 py-1">

          <Camera />

        </div>

        {/* Right Side Starts */}

        <div className="space-y-11 xl:col-span-4">
                  {/* ================= RECENT ACTIVITY ================= */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[30px] border border-white/80 bg-white/70 p-10 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl"
          >
            <div className="mb-7 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Latest AI detection events
                </p>

              </div>

              <FaCheckCircle
                className="text-green-500"
                size={22}
              />

            </div>

            <div className="space-y-7">

              {activities.map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className={`rounded-2xl p-4 transition

                    ${
                      item.color === "green"
                        ? "bg-green-50"
                        : item.color === "pink"
                        ? "bg-pink-50"
                        : "bg-blue-50"
                    }

                  `}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-sm font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.time}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold

                        ${
                          item.color === "green"
                            ? "bg-green-100 text-green-700"
                            : item.color === "pink"
                            ? "bg-pink-100 text-pink-600"
                            : "bg-blue-100 text-blue-700"
                        }

                      `}
                    >
                      {item.status}
                    </span>

                  </div>

                </motion.div>

              ))}

            </div>

          </motion.div>
        
          {/* ================= QUICK ACTIONS ================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .2 }}
            className="rounded-[30px] border border-white/80 bg-white/70 p-11 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl"
          >

            <h2 className="text-xl font-bold">
              Quick Actions
            </h2>

            <p className="mt-1 mb-8 text-xs text-gray-500">
              Frequently used shortcuts
            </p>

            <div className="space-y-5">

              <button
                onClick={() => navigate("/face-detection")}
                className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02]"
              >
                ▶ Start Face Detection
              </button>

              <button
                onClick={() => navigate("/history")}
                className="w-full rounded-2xl border border-violet-200 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                📜 View Detection History
              </button>

              <button
                onClick={() => navigate("/music")}
                className="w-full rounded-2xl border border-pink-200 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
              >
                🎵 Open Music Recommendation
              </button>

            </div>

          </motion.div>

        
        </div>

      </section>

      {/* ================= SYSTEM OVERVIEW ================= */}

<motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .5 }}
        className="grid gap-6 lg:grid-cols-3 pt-1 pb-4 "
      >      

        <div className="rounded-2xl border h-[230px] border-white/80 bg-white/70 p-8 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl ">

          <h2 className="text-xl font-bold">
            Detection Accuracy
          </h2>

          <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
            98%
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            AI model is detecting faces with excellent confidence and high precision.
          </p>

        </div>

        <div className="rounded-2xl h-[230px] border border-white/80 bg-white/70 p-7 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl">

          <h2 className="text-lg font-bold">
            Today's Summary
          </h2>

          <div className="mt-6 space-y-4 ">

            <div className="flex justify-between">

              <span className="text-sm text-gray-500">
                Faces Detected
              </span>

              <span className="font-semibold">
                {stats.detected}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-sm text-gray-500">
                History Records
              </span>

              <span className="font-semibold">
                {stats.history}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-sm text-gray-500">
                Camera
              </span>

              <span className="font-semibold text-green-600">
                Online
              </span>

            </div>

          </div>

        </div>

        <div className="overflow-hidden h-[230px] rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-7  pb-5 text-white shadow-[0_25px_60px_rgba(168,85,247,.30)]">

          <h2 className="text-xl font-bold">
            AI Recommendation
          </h2>

          <p className="mt-3 text-sm leading-7 text-white/90">
            Your current detected mood is
            <span className="font-semibold"> Happy 😊</span>.
            AI recommends listening to relaxing or energetic playlists
            for a better experience.
          </p>

          <button
            onClick={() => navigate("/music")}
            className="mt-5 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:scale-105"
          >
            Open Music
          </button>

        </div>

      </motion.section>



{/* ================= DASHBOARD CARDS ================= */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 pt-2 ">

        <DashboardCard
          title="Camera Status"
          value={stats.camera}
          subtitle="Ready for Detection"
          icon={<MdCameraAlt />}
          color="from-green-500 to-emerald-500"
        />

        <DashboardCard
          title="Faces Detected"
          value={stats.detected}
          subtitle="Today's Detection"
          icon={<MdFaceRetouchingNatural />}
          color="from-pink-500 to-violet-600"
        />

        <DashboardCard
          title="History"
          value={stats.history}
          subtitle="Saved Records"
          icon={<MdHistory />}
          color="from-orange-400 to-red-500"
        />

        <DashboardCard
          title="Current Mood"
          value={stats.mood}
          subtitle="AI Recommendation"
          icon={<FaMusic />}
          color="from-cyan-500 to-blue-600"
        />

      </section>
    </div>

  );

};

export default Dashboard;


