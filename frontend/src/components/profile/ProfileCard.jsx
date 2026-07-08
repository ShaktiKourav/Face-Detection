import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdFingerprint } from "react-icons/md";
import {
  MdEdit,
  MdEmail,
  MdPhone,
  MdVerified,
  MdPerson,
} from "react-icons/md";

import {
  FaCamera,
} from "react-icons/fa";

const ProfileCard = () => {

  /* ==========================================
            USER DATA
  ========================================== */

  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "",
    photo: "",
    uid: "",
  });

  const [stats, setStats] = useState({
    detections: 0,
    lastMood: "Happy",
    favoriteSong: "Happy Vibes",
  });

  /* ==========================================
            LOAD USER
  ========================================== */

  useEffect(() => {

    const userData =
      JSON.parse(localStorage.getItem("user"));

    if (userData) {

      setUser({
        name: userData.name || "Guest User",
        email: userData.email || "",
        phone: userData.phone || "",
        photo: userData.photo || "",
        uid: userData.uid || "",
      });

    }

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    if (history.length > 0) {

      const latest =
        history[history.length - 1];

      setStats({

        detections: history.length,

        lastMood: latest.mood || "Happy",

        favoriteSong:
          latest.song || "Happy Vibes",

      });

    }

  }, []);

  /* ==========================================
            UI
  ========================================== */

 return (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="glass rounded-[26px] p-5 lg:p-6"
  >
    {/* ================= HEADER ================= */}

    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600">
          User Profile
        </span>

        <h2 className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
          Account Information
        </h2>

        <p className="mt-2 max-w-xl text-[13px] leading-6 text-[var(--text-secondary)]">
          View and manage your profile information, account details,
          detection statistics and personalized AI recommendations.
        </p>

      </div>

      <button
        className="
        flex items-center gap-2
        rounded-xl
        bg-gradient-to-r
        from-pink-500
        to-violet-600
        px-5 py-2.5
        text-sm font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        "
      >
        <MdEdit size={18} />
        Edit Profile
      </button>

    </div>

    {/* ================= PROFILE CARD ================= */}

    <div
      className="
      mt-6
      overflow-hidden
      rounded-[24px]
      bg-gradient-to-r
      from-pink-500
      via-fuchsia-500
      to-violet-600
      p-6
      text-white
      shadow-[0_20px_60px_rgba(168,85,247,.25)]
      "
    >

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

        {/* Avatar */}

        <div className="relative mx-auto lg:mx-0">

          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-xl">

            {user.photo ? (

              <img
                src={user.photo}
                alt={user.name}
                className="h-full w-full object-cover"
              />

            ) : (

              <div className="flex h-full w-full items-center justify-center bg-white text-pink-500">

                <MdPerson size={62} />

              </div>

            )}

          </div>

          <button
            className="
            absolute
            bottom-1
            right-1
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white
            text-pink-600
            shadow-lg
            transition
            hover:scale-105
            "
          >
            <FaCamera size={14} />
          </button>

        </div>

        {/* User Info */}

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-3xl font-bold">
              {user.name}
            </h2>

            <span className="rounded-full bg-green-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Online
            </span>

          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div className="flex items-start gap-3">

              <MdEmail size={20} />

              <div>

                <p className="text-[11px] uppercase tracking-wide text-white/70">
                  Email
                </p>

                <p className="text-sm font-medium break-all">
                  {user.email}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <MdPhone size={20} />

              <div>

                <p className="text-[11px] uppercase tracking-wide text-white/70">
                  Phone
                </p>

                <p className="text-sm font-medium">
                  {user.phone || "Not Added"}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <MdVerified size={20} />

              <div>

                <p className="text-[11px] uppercase tracking-wide text-white/70">
                  Status
                </p>

                <p className="text-sm font-medium">
                  Verified Account
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3">

              <MdFingerprint size={20}  />

              <div>

              <p className="text-[11px] uppercase tracking-wide text-white/70">
                User ID
              </p>

              <p className="truncate text-sm font-medium">
                {user.uid || "Local User"}
              </p>

            </div>
            </div>

          </div>

        </div>

      </div>

    </div>
    {/* ======================================
        STATISTICS
====================================== */}

<div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

  {[
    {
      title: "Faces",
      value: stats.detections,
      icon: "😊",
      color: "from-pink-500 to-violet-600",
    },
    {
      title: "Mood",
      value: stats.lastMood,
      icon: "🎭",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Playlist",
      value: stats.favoriteSong,
      icon: "🎵",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Plan",
      value: "Premium",
      icon: "⭐",
      color: "from-orange-400 to-pink-500",
    },
  ].map((item) => (

    <motion.div
      key={item.title}
      whileHover={{ y: -4 }}
      transition={{ duration: .25 }}
      className="
      glass
      rounded-[22px]
      border
      border-[var(--border-color)]
      p-4
      shadow-sm
      transition-all
      duration-300
      hover:shadow-xl
      "
    >

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-lg text-white`}
      >
        {item.icon}
      </div>

      <h3 className="mt-4 truncate text-xl font-bold text-[var(--text-primary)]">
        {item.value}
      </h3>

      <p className="mt-1 text-xs text-[var(--text-secondary)]">
        {item.title}
      </p>

    </motion.div>

  ))}

</div>

{/* ======================================
        RECENT ACTIVITY + MOOD SUMMARY
====================================== */}

<div className="mt-7 grid gap-5 xl:grid-cols-2">

  {/* Recent Activity */}

  <div className="glass rounded-[24px] border border-[var(--border-color)] p-5">

    <h3 className="text-lg font-bold text-[var(--text-primary)]">
      Recent Activity
    </h3>

    <p className="mt-1 text-xs text-[var(--text-secondary)]">
      Latest AI events
    </p>

    <div className="mt-5 space-y-3">

      {[
        {
          title: "Face Detected",
          time: "2 min ago",
          badge: "Success",
          color:
            "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
        },
        {
          title: "Mood Predicted",
          time: "5 min ago",
          badge: stats.lastMood,
          color:
            "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300",
        },
        {
          title: "Playlist Generated",
          time: "10 min ago",
          badge: "Done",
          color:
            "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
        },
        {
          title: "History Saved",
          time: "12 min ago",
          badge: "Saved",
          color:
            "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
        },
      ].map((item) => (

        <motion.div
          key={item.title}
          whileHover={{ x: 5 }}
          className="
          flex
          items-center
          justify-between
          rounded-2xl
          bg-[var(--hover)]
          p-4
          transition
          "
        >

          <div>

            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              {item.title}
            </h4>

            <p className="text-xs text-[var(--text-secondary)]">
              {item.time}
            </p>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold ${item.color}`}
          >
            {item.badge}
          </span>

        </motion.div>

      ))}

    </div>

  </div>

  {/* Mood Summary */}

  <div className="glass rounded-[24px] border border-[var(--border-color)] p-5">

    <h3 className="text-lg font-bold text-[var(--text-primary)]">
      Mood Summary
    </h3>

    <p className="mt-1 text-xs text-[var(--text-secondary)]">
      Latest AI recommendation
    </p>

    <div className="mt-5 rounded-[22px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-5 text-white">

      <div className="text-4xl">
        😊
      </div>

      <h2 className="mt-3 text-2xl font-bold">
        {stats.lastMood}
      </h2>

      <p className="mt-1 text-xs text-white/80">
        Recommended Playlist
      </p>

      <div className="mt-5 rounded-2xl bg-white/15 p-4 backdrop-blur-md">

        <h4 className="text-base font-semibold">
          {stats.favoriteSong}
        </h4>

        <p className="mt-2 text-xs leading-5 text-white/85">
          AI selected this playlist based on your latest detected emotion to improve your listening experience.
        </p>

      </div>

    </div>

  </div>

</div>
      {/* ======================================
            AI STATUS & PERFORMANCE
      ====================================== */}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">

        {/* AI Status */}

        <div className="glass rounded-[24px] p-5">

          <div>

            <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600 dark:bg-pink-500/20 dark:text-pink-300">
              AI Performance
            </span>

            <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
              System Status
            </h3>

            <p className="mt-2 text-[13px] leading-6 text-[var(--text-secondary)]">
              Current performance of all AI detection modules.
            </p>

          </div>

          <div className="mt-6 space-y-5">

            {[
              {
                name: "Camera",
                value: "100%",
                width: "100%",
              },
              {
                name: "Face Detection",
                value: "98%",
                width: "98%",
              },
              {
                name: "Mood Prediction",
                value: "96%",
                width: "96%",
              },
              {
                name: "Music Recommendation",
                value: "99%",
                width: "99%",
              },
            ].map((item) => (

              <div key={item.name}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {item.name}
                  </span>

                  <span className="text-xs font-semibold text-pink-500">
                    {item.value}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[var(--hover)]">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.width }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600"
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Overall */}

        <motion.div
          whileHover={{ y: -4 }}
          className="overflow-hidden rounded-[24px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 p-5 text-white shadow-xl"
        >

          <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
            AI Engine
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            99.8%
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/90">
            Face Detection, Mood Prediction, History Tracking
            and Music Recommendation are operating normally.
          </p>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">

            <p className="text-xs uppercase tracking-wider text-white/70">
              Status
            </p>

            <h4 className="mt-1 text-lg font-semibold">
              All Services Online
            </h4>

          </div>

        </motion.div>

      </div>

      {/* ======================================
              INFORMATION
      ====================================== */}

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        {[
          {
            title: "Privacy",
            icon: "🔒",
            desc: "Detection history is stored securely on your device.",
          },
          {
            title: "AI Analysis",
            icon: "🤖",
            desc: "Every face is analysed instantly using AI.",
          },
          {
            title: "Music Engine",
            icon: "🎵",
            desc: "Personalized playlists based on your mood.",
          },
        ].map((item) => (

          <motion.div
            key={item.title}
            whileHover={{ y: -4 }}
            className="glass rounded-[22px] p-5 transition-all duration-300"
          >

            <div className="text-3xl">
              {item.icon}
            </div>

            <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
              {item.title}
            </h3>

            <p className="mt-2 text-[13px] leading-6 text-[var(--text-secondary)]">
              {item.desc}
            </p>

          </motion.div>

        ))}

      </div>

      {/* ======================================
              FOOTER
      ====================================== */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="mt-8 overflow-hidden rounded-[24px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-6 text-white shadow-xl"
      >

        <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
          AI MoodSense
        </span>

        <h2 className="mt-4 text-2xl font-bold">
          Smart Profile Dashboard
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/90">
          View your profile, detection history, AI insights,
          mood analysis and personalized music recommendations
          in one beautifully designed dashboard.
        </p>

      </motion.div>

    </motion.div>
 )

};

export default ProfileCard;