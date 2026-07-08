import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import {
  MdDarkMode,
  MdLightMode,
  MdNotificationsActive,
  MdMusicNote,
  MdCameraAlt,
  MdSecurity,
  MdInfo,
  MdLogout,
  MdDeleteForever,
} from "react-icons/md";

const SettingsCard = () => {

  /* ==========================================
            SETTINGS STATES
  ========================================== */

  const [darkMode, setDarkMode] = useState(false);

  const [notifications, setNotifications] = useState(true);

  const [autoMusic, setAutoMusic] = useState(true);

  const [cameraPermission, setCameraPermission] =
    useState("Checking...");

  /* ==========================================
            LOAD SETTINGS
  ========================================== */

  useEffect(() => {

    const theme =
      localStorage.getItem("theme");

    if (theme === "dark") {

      setDarkMode(true);

      document.documentElement.classList.add("dark");

    }

    const notify =
      localStorage.getItem("notifications");

    if (notify !== null) {

      setNotifications(JSON.parse(notify));

    }

    const music =
      localStorage.getItem("autoMusic");

    if (music !== null) {

      setAutoMusic(JSON.parse(music));

    }

    checkCameraPermission();

  }, []);

  /* ==========================================
            CAMERA PERMISSION
  ========================================== */

  const checkCameraPermission = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      setCameraPermission("Allowed");

      stream.getTracks().forEach(track =>
        track.stop()
      );

    } catch {

      setCameraPermission("Blocked");

    }

  };

  /* ==========================================
            THEME
  ========================================== */

 const handleTheme = () => {

  const newTheme =
    darkMode ? "light" : "dark";

  setDarkMode(!darkMode);

  localStorage.setItem(
    "theme",
    newTheme
  );

  document.documentElement.setAttribute(
    "data-theme",
    newTheme
  );

};

  /* ==========================================
            NOTIFICATIONS
  ========================================== */

  const handleNotification = () => {

    const value = !notifications;

    setNotifications(value);

    localStorage.setItem(
      "notifications",
      JSON.stringify(value)
    );

  };

  /* ==========================================
            AUTO MUSIC
  ========================================== */

  const handleMusic = () => {

    const value = !autoMusic;

    setAutoMusic(value);

    localStorage.setItem(
      "autoMusic",
      JSON.stringify(value)
    );

  };

  /* ==========================================
            UI
  ========================================== */

  return (

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  className="glass rounded-[28px] p-6 lg:p-7"
>

  {/* ======================================
            HEADER
  ====================================== */}

  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600 dark:bg-pink-500/20 dark:text-pink-300">

        Application Settings

      </span>

      <h2 className="mt-3 text-2xl font-bold text-[var(--text-primary)]">

        Preferences

      </h2>

      <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[var(--text-secondary)]">

        Customize your dashboard experience, theme,
        notifications and AI-powered features according
        to your preferences.

      </p>

    </div>

    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 text-white shadow-xl">

      <MdSecurity size={30} />

    </div>

  </div>

  {/* ======================================
            SETTINGS
  ====================================== */}

  <div className="mt-7 space-y-4">

    {/* Theme */}

    <div className="glass flex items-center justify-between rounded-[22px] p-4 transition-all duration-300 hover:-translate-y-1">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-500/20">

          {darkMode ? (
            <MdDarkMode
              size={24}
              className="text-pink-500"
            />
          ) : (
            <MdLightMode
              size={24}
              className="text-yellow-500"
            />
          )}

        </div>

        <div>

          <h3 className="text-base font-semibold text-[var(--text-primary)]">

            Theme

          </h3>

          <p className="text-[13px] text-[var(--text-secondary)]">

            Switch between Light and Dark mode.

          </p>

        </div>

      </div>

      <button
        onClick={handleTheme}
        className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-pink-500 to-violet-600"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >

        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
            darkMode ? "left-8" : "left-1"
          }`}
        />

      </button>

    </div>

    {/* Notifications */}

    <div className="glass flex items-center justify-between rounded-[22px] p-4 transition-all duration-300 hover:-translate-y-1">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/20">

          <MdNotificationsActive
            size={24}
            className="text-violet-600 dark:text-violet-400"
          />

        </div>

        <div>

          <h3 className="text-base font-semibold text-[var(--text-primary)]">

            Notifications

          </h3>

          <p className="text-[13px] text-[var(--text-secondary)]">

            Receive AI alerts and activity updates.

          </p>

        </div>

      </div>

      <button
        onClick={handleNotification}
        className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
          notifications
            ? "bg-gradient-to-r from-pink-500 to-violet-600"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >

        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
            notifications ? "left-8" : "left-1"
          }`}
        />

      </button>

    </div>

    {/* Auto Music */}

    <div className="glass flex items-center justify-between rounded-[22px] p-4 transition-all duration-300 hover:-translate-y-1">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 dark:bg-cyan-500/20">

          <MdMusicNote
            size={24}
            className="text-cyan-600 dark:text-cyan-400"
          />

        </div>

        <div>

          <h3 className="text-base font-semibold text-[var(--text-primary)]">

            Auto Music

          </h3>

          <p className="text-[13px] text-[var(--text-secondary)]">

            Automatically play mood-based music.

          </p>

        </div>

      </div>

      <button
        onClick={handleMusic}
        className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
          autoMusic
            ? "bg-gradient-to-r from-pink-500 to-violet-600"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >

        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
            autoMusic ? "left-8" : "left-1"
          }`}
        />

      </button>

    </div>

  </div>
    {/* ======================================
          CAMERA PERMISSION
  ====================================== */}

  <div className="mt-6 glass rounded-[24px] p-5">

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-500/20">

          <MdCameraAlt
            size={24}
            className="text-pink-600 dark:text-pink-400"
          />

        </div>

        <div>

          <h3 className="text-base font-semibold text-[var(--text-primary)]">

            Camera Permission

          </h3>

          <p className="text-[13px] text-[var(--text-secondary)]">

            Required for real-time face detection.

          </p>

        </div>

      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          cameraPermission === "Allowed"
            ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
            : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
        }`}
      >

        {cameraPermission}

      </span>

    </div>

  </div>

  {/* ======================================
          PRIVACY & SECURITY
  ====================================== */}

  <div className="mt-6 glass rounded-[24px] p-5">

    <div className="flex items-start gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/20">

        <MdSecurity
          size={24}
          className="text-violet-600 dark:text-violet-400"
        />

      </div>

      <div className="flex-1">

        <h3 className="text-lg font-semibold text-[var(--text-primary)]">

          Privacy & Security

        </h3>

        <p className="mt-2 text-[13px] leading-6 text-[var(--text-secondary)]">

          Face detection records remain securely stored on your
          device. No biometric information is shared with any
          third-party service.

        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">

            <h4 className="text-sm font-semibold text-[var(--text-primary)]">

              Face History

            </h4>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">

              Secure Local Storage

            </p>

          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">

            <h4 className="text-sm font-semibold text-[var(--text-primary)]">

              Authentication

            </h4>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">

              Firebase Secure Login

            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

  {/* ======================================
          APPLICATION INFO
  ====================================== */}

  <div className="mt-6 glass rounded-[24px] p-5">

    <div className="flex items-start gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 dark:bg-cyan-500/20">

        <MdInfo
          size={24}
          className="text-cyan-600 dark:text-cyan-400"
        />

      </div>

      <div className="flex-1">

        <h3 className="text-lg font-semibold text-[var(--text-primary)]">

          Application Information

        </h3>

        <p className="mt-1 text-[13px] text-[var(--text-secondary)]">

          AI MoodSense Dashboard

        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          {[
            ["Version", "v1.0.0"],
            ["Framework", "React + Vite"],
            ["Authentication", "Firebase"],
            ["AI Engine", "Face Detection + Mood AI"],
          ].map(([title, value]) => (

            <div
              key={title}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4"
            >

              <p className="text-[11px] text-[var(--text-secondary)]">

                {title}

              </p>

              <h4 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">

                {value}

              </h4>

            </div>

          ))}

        </div>

      </div>

    </div>

  </div>

  {/* ======================================
          AI ENGINE
  ====================================== */}

  <motion.div

    whileHover={{ y: -3 }}

    className="mt-6 overflow-hidden rounded-[24px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-6 text-white shadow-xl"

  >

    <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">

      AI Engine

    </span>

    <h2 className="mt-3 text-2xl font-bold">

      AI MoodSense

    </h2>

    <p className="mt-3 text-[13px] leading-6 text-white/90">

      The AI engine continuously analyses facial expressions,
      predicts emotions and recommends personalized music
      while maintaining a fast, secure and intelligent
      experience.

    </p>

  </motion.div>
    {/* ======================================
          ACTION BUTTONS
  ====================================== */}

  <div className="mt-6 grid gap-4 md:grid-cols-2">

    {/* Clear History */}

    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {

        const ok = window.confirm(
          "Clear all detection history?"
        );

        if (!ok) return;

        localStorage.removeItem("history");

        alert("Detection history cleared.");

      }}
      className="flex items-center justify-center gap-3 rounded-[22px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
    >

      <MdDeleteForever size={22} />

      Clear Detection History

    </motion.button>

    {/* Logout */}

    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={async () => {

        const ok = window.confirm(
          "Are you sure you want to logout?"
        );

        if (!ok) return;

        try {

          await signOut(auth);

        } catch (err) {

          console.log(err);

        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");

        window.location.href = "/login";

      }}
      className="flex items-center justify-center gap-3 rounded-[22px] bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl"
    >

      <MdLogout size={22} />

      Logout

    </motion.button>

  </div>

  {/* ======================================
          CURRENT SETTINGS
  ====================================== */}

  <div className="mt-6 glass rounded-[24px] p-5">

    <h3 className="text-lg font-semibold text-[var(--text-primary)]">

      Current Preferences

    </h3>

    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {[
        {
          title: "Theme",
          value: darkMode ? "Dark" : "Light",
          color: "bg-pink-100 dark:bg-pink-500/20",
        },
        {
          title: "Notifications",
          value: notifications ? "Enabled" : "Disabled",
          color: "bg-violet-100 dark:bg-violet-500/20",
        },
        {
          title: "Auto Music",
          value: autoMusic ? "Enabled" : "Disabled",
          color: "bg-cyan-100 dark:bg-cyan-500/20",
        },
        {
          title: "Camera",
          value: cameraPermission,
          color: "bg-orange-100 dark:bg-orange-500/20",
        },
      ].map((item) => (

        <motion.div
          key={item.title}
          whileHover={{ y: -3 }}
          className={`rounded-2xl ${item.color} p-4`}
        >

          <p className="text-[11px] text-[var(--text-secondary)]">

            {item.title}

          </p>

          <h4 className="mt-2 text-base font-semibold text-[var(--text-primary)]">

            {item.value}

          </h4>

        </motion.div>

      ))}

    </div>

  </div>

  {/* ======================================
          FOOTER
  ====================================== */}

  <motion.div
    whileHover={{ scale: 1.01 }}
    className="mt-6 overflow-hidden rounded-[24px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-6 text-white shadow-xl"
  >

    <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">

      AI MoodSense

    </span>

    <h2 className="mt-3 text-2xl font-bold">

      Smart Settings Experience

    </h2>

    <p className="mt-3 max-w-3xl text-[13px] leading-6 text-white/90">

      Personalize your dashboard with theme preferences,
      AI music recommendations, notifications and privacy
      settings. Every preference is securely stored locally
      to deliver a faster and more intelligent experience.

    </p>

  </motion.div>

</motion.div>

);
  
 
};

export default SettingsCard;