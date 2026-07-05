

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import {
  MdFaceRetouchingNatural,
  MdHistory,
  MdCameraAlt,
  MdSecurity,
  MdArrowForward,
} from "react-icons/md";

import {
  FaMusic,
  FaClock,
  FaRegSmile,
} from "react-icons/fa";

const Home = () => {
  const [time, setTime] = useState(new Date());

  const [stats, setStats] = useState({
    detections: 158,
    history: 248,
    playlists: 15,
    camera: "Online",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());

      const history =
        JSON.parse(localStorage.getItem("history")) || [];

      setStats({
        detections: history.length || 158,
        history: history.length || 248,
        playlists: 15,
        camera: "Online",
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    {
      title: "Start Detection",
      desc: "Launch AI Camera",
      icon: <MdCameraAlt size={22} />,
      link: "/face-detection",
      color: "from-pink-500 to-violet-600",
    },
    {
      title: "Detection History",
      desc: "View Saved Faces",
      icon: <MdHistory size={22} />,
      link: "/history",
      color: "from-orange-400 to-red-500",
    },
    {
      title: "Music Recommendation",
      desc: "Mood Based Playlist",
      icon: <FaMusic size={20} />,
      link: "/music",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* ================= HERO ================= */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(168,85,247,.12)] backdrop-blur-2xl lg:p-10 "
      >
        {/* Glow */}

        <div className="absolute -left-20 -top-10 h-72 w-72 rounded-full bg-pink-300/20 blur-[120px]" />

        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-300/20 blur-[120px]" />

        <div className="relative grid items-center gap-4 lg:grid-cols-2">

          {/* Left */}

          <div className="mt-0">

            <span className="rounded-full m-2  bg-pink-100 px-2 py-1 text-xs font-semibold  tracking-wider text-pink-700">
              AI Powered Face Detection
            </span>

            <h1 className="mt-3 text-xl font-semibold leading-tight lg:text-5xl">

              Smart

              <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">

                {" "}Face Detection

              </span>

              <br />

              Premium Dashboard

            </h1>

            <p className="mt-2 max-w-xl text-[15px] leading-6 text-gray-600">
              Monitor faces in real time, save detection history,
              analyse activity and receive AI powered mood music
              recommendations through one premium interface.
            </p>

            <div className="mt-5 flex flex-wrap gap-4">

              <Link
                to="/face-detection"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1"
              >
                Start Detection

                <MdArrowForward />
              </Link>

              <Link
                to="/dashboard"
                className="rounded-2xl border border-violet-200 bg-white px-7 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Dashboard
              </Link>

            </div>

            {/* Live */}

            <div className="mt-8 flex flex-wrap gap-5">

              <div className="flex items-center gap-3 rounded-2xl bg-pink-50 px-5 py-3">

                <FaClock className="text-pink-500" />

                <div>

                  <p className="text-xs text-gray-500">
                    Live Time
                  </p>

                  <h3 className="font-semibold">
                    {time.toLocaleTimeString()}
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-violet-50 px-5 py-3">

                <FaRegSmile className="text-violet-600" />

                <div>

                  <p className="text-xs text-gray-500">
                    Current Mood
                  </p>

                  <h3 className="font-semibold">
                    Happy 😊
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <motion.div

              animate={{
                y: [0, -12, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 4,
              }}

              className="flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 shadow-[0_25px_70px_rgba(168,85,247,.35)]"
            >

              <MdFaceRetouchingNatural
                className="text-white"
                size={120}
              />

            </motion.div>

          </div>

        </div>

      </motion.section>

     

      {/* ================= QUICK ACTIONS ================= */}

      <section className="rounded-3xl border border-white/80 bg-white/70 p-7 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl ">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Quick Actions
            </h2>

            <p className="mt-0 text-sm text-gray-500">
              Access the most used modules instantly.
            </p>

          </div>

        </div>

        <div className="grid gap-10 md:grid-cols-3">

          {quickActions.map((item) => (

            <Link
              key={item.title}
              to={item.link}
            >

              <motion.div

                whileHover={{
                  y: -6,
                }}

                className="group rounded-3xl border border-white bg-white p-6 shadow-sm transition hover:shadow-xl"
              >

                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white`}>

                  {item.icon}

                </div>

                <h3 className="mt-4 text-lg font-semibold">

                  {item.title}

                </h3>

                <p className="mt-0 text-sm text-gray-500">

                  {item.desc}

                </p>

                <div className="mt-4 flex items-center gap-2 font-semibold text-pink-500">

                  Open

                  <MdArrowForward />

                </div>

              </motion.div>

            </Link>

          ))}

        </div>

      </section>

           

    

      {/* ================= RECENT ACTIVITY ================= */}

      <section className="grid gap-8 xl:grid-cols-3 pt-2 pb-2">

        {/* Activity */}

        <div className="xl:col-span-2 rounded-[30px] border border-white/80 bg-white/70 p-10 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl">

          <div className="mb-7 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Recent Activity
              </h2>

              <p className="mt-0 text-sm text-gray-500">
                Latest system events.
              </p>

            </div>

          </div>

          <div className="space-y-6">

            {[
              {
                title: "Face Detected Successfully",
                time: "2 Minutes Ago",
                status: "Success",
                bg: "bg-green-50",
                badge: "bg-green-100 text-green-700",
              },
              {
                title: "Mood Predicted : Happy 😊",
                time: "5 Minutes Ago",
                status: "AI",
                bg: "bg-pink-50",
                badge: "bg-pink-100 text-pink-600",
              },
              {
                title: "History Updated",
                time: "10 Minutes Ago",
                status: "Saved",
                bg: "bg-violet-50",
                badge: "bg-violet-100 text-violet-700",
              },
              {
                title: "Music Recommendation Generated",
                time: "15 Minutes Ago",
                status: "Done",
                bg: "bg-blue-50",
                badge: "bg-blue-100 text-blue-700",
              },
            ].map((item) => (

              <motion.div
                whileHover={{ x: 5 }}
                key={item.title}
                className={`flex items-center justify-between rounded-2xl ${item.bg} p-5`}
              >

                <div>

                  <h3 className="font-semibold text-sm">
                    {item.title}
                  </h3>

                  <p className="mt-0 text-xs text-gray-500">
                    {item.time}
                  </p>

                </div>

                <span className={`rounded-full px-4 py-1 text-xs font-semibold ${item.badge}`}>
                  {item.status}
                </span>

              </motion.div>

            ))}

          </div>

        </div>

        {/* AI STATUS */}

        <div className="space-y-6">

          <div className="rounded-[30px] border border-white/80 bg-white/70 p-6 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl">

            <h2 className="text-xl font-bold">
              AI Status
            </h2>

            <div className="mt-4 space-y-4">

              {[
                {
                  name: "Camera",
                  value: "100%",
                  width: "w-full",
                },
                {
                  name: "Detection",
                  value: "96%",
                  width: "w-[96%]",
                },
                {
                  name: "Recognition",
                  value: "94%",
                  width: "w-[94%]",
                },
                {
                  name: "Performance",
                  value: "99%",
                  width: "w-[99%]",
                },
              ].map((item) => (

                <div key={item.name}>

                  <div className="mb-2 flex justify-between text-sm">

                    <span>{item.name}</span>

                    <span>{item.value}</span>

                  </div>

                  <div className="h-3 rounded-full bg-pink-100">

                    <div
                      className={`h-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 ${item.width}`}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className="rounded-[30px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 p-7 text-white shadow-[0_25px_60px_rgba(168,85,247,.25)]">

            <h2 className="text-2xl font-bold">
              System Health
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/90">
              Everything is working perfectly.
              Camera, AI Engine and Detection
              modules are active.
            </p>

            <div className="mt-4 pb-2 rounded-2xl bg-white/20 p-6 backdrop-blur-lg">

              <h3 className="text-3xl font-bold">
                99.8%
              </h3>

              <p className="mt-1 text-sm">
                Overall System Performance
              </p>

            </div>

          </div>

        </div>

      </section>

            {/* ================= HOW IT WORKS ================= */}

      <section className="rounded-[30px] border border-white/80 bg-white/70 p-8 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl ">

        <div className="mb-4">

          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
            Workflow
          </span>

          <h2 className="mt-2 text-2xl font-bold">
            How It Works
          </h2>

          <p className="mt-0 text-sm text-gray-500">
            Our AI-powered face detection follows a simple and intelligent process.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-4">

          {[
            {
              step: "01",
              title: "Open Camera",
              desc: "Start your webcam and initialize the detection engine.",
            },
            {
              step: "02",
              title: "Detect Face",
              desc: "AI scans faces and calculates confidence instantly.",
            },
            {
              step: "03",
              title: "Analyze Mood",
              desc: "Predicts user mood and stores the detection record.",
            },
            {
              step: "04",
              title: "Recommend Music",
              desc: "Suggests playlists based on detected mood.",
            },
          ].map((item) => (

            <motion.div
              key={item.step}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white bg-white p-6 shadow-sm transition hover:shadow-xl"
            >

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-xl font-bold text-white">

                {item.step}

              </div>

              <h3 className="text-lg font-semibold">
                {item.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </section>


           {/* ================= LIVE STATS ================= */}

      <section className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4 pt-3 pb-1 ">

        {[
          {
            icon: <MdCameraAlt size={34} />,
            value: stats.camera,
            title: "Camera Status",
            color: "text-pink-500",
          },

          {
            icon: <MdFaceRetouchingNatural size={34} />,
            value: stats.detections,
            title: "Faces Detected",
            color: "text-violet-600",
          },

          {
            icon: <MdHistory size={34} />,
            value: stats.history,
            title: "History Records",
            color: "text-orange-500",
          },

          {
            icon: <FaMusic size={30} />,
            value: stats.playlists,
            title: "Playlists",
            color: "text-cyan-500",
          },

        ].map((item) => (

          <motion.div

            whileHover={{
              y: -6,
            }}

            key={item.title}

            className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-[0_12px_35px_rgba(168,85,247,.08)] backdrop-blur-xl"
          >

            <div className={item.color}>

              {item.icon}

            </div>

            <h2 className="mt-3 px-2 text-2xl font-bold">

              {item.value}

            </h2>

            <p className="mt-0 text-sm text-gray-500">

              {item.title}

            </p>

          </motion.div>

        ))}

      </section>



      {/* ================= AI INSIGHTS ================= */}

      <section className="grid gap-8 lg:grid-cols-3 pt-1 pb-1">

        <motion.div
          whileHover={{ y: -6 }}
          className="rounded-[30px] border border-white/80 bg-white/70 p-6 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl"
        >

          <h3 className="text-xl font-bold">
            AI Insight
          </h3>

          <p className="pt-2 text-sm leading-7 text-gray-500">
            The AI engine continuously monitors live camera input to
            improve recognition quality and provide fast, reliable
            detection results.
          </p>

        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          className="rounded-[30px] border border-white/80 bg-white/70 p-6 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl"
        >

          <h3 className="text-xl font-bold">
            Security
          </h3>

          <p className="mt-4 text-sm leading-7 text-gray-500">
            Detection history is securely stored locally. No sensitive
            information is transmitted to external servers in this demo.
          </p>

        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          className="rounded-[30px] border border-white/80 bg-white/70 p-6 shadow-[0_18px_45px_rgba(168,85,247,.10)] backdrop-blur-2xl"
        >

          <h3 className="text-xl font-bold">
            Smart Recommendation
          </h3>

          <p className="mt-4 text-sm leading-7 text-gray-500">
            Based on detected mood, the system recommends playlists that
            enhance productivity, relaxation, or positive emotions.
          </p>

        </motion.div>

      </section>

      {/* ================= CTA ================= */}

      <motion.section
        whileHover={{ scale: 1.01 }}
        className="overflow-hidden rounded-[32px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-8 text-white shadow-[0_30px_80px_rgba(168,85,247,.30)] mt-1"
      >

        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold  tracking-wider">
              Ready to Explore?
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Experience Premium
              <br />
              AI Face Detection
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-white/90">
              Launch live face detection, monitor activities,
              manage history and discover AI-powered music
              recommendations in one elegant dashboard.
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/face-detection"
              className="rounded-2xl bg-white px-8 py-3 text-sm font-semibold text-violet-700 transition duration-300 hover:scale-105"
            >
              Start Detection
            </Link>

            <Link
              to="/dashboard"
              className="rounded-2xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold backdrop-blur-lg transition duration-300 hover:bg-white/20"
            >
              Open Dashboard
            </Link>

          </div>

        </div>

      </motion.section>


    </div>
  );
};

export default Home;