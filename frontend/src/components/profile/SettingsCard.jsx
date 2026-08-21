import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  /* ==========================================
            SETTINGS STATES
  ========================================== */

  const [darkMode, setDarkMode] = useState(false);

  
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

    const music =
      localStorage.getItem("autoMusic");

    if (music !== null) {

      setAutoMusic(JSON.parse(music));

    }

    checkCameraPermission();

  }, []);


   /* ==========================================
            HANDLE HISTORY
  ========================================== */

const handleClearHistory = () => {

  const ok = window.confirm(
    "Are you sure you want to clear all detection history?"
  );

  if (!ok) return;

  localStorage.removeItem("history");

  alert("Detection history cleared successfully.");

};

  /* ==========================================
            CAMERA PERMISSION
  ========================================== */

 const checkCameraPermission = async () => {
  try {
    if (!navigator.permissions) {
      setCameraPermission("Unknown");
      return;
    }

    const permission = await navigator.permissions.query({
      name: "camera",
    });

    const updatePermission = (state) => {
      switch (state) {
        case "granted":
          setCameraPermission("Allowed");
          break;

        case "denied":
          setCameraPermission("Blocked");
          break;

        default:
          setCameraPermission("Ask");
      }
    };

    updatePermission(permission.state);

    permission.onchange = () => {
      updatePermission(permission.state);
    };

  } catch {
    setCameraPermission("Unknown");
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
          LOGOUT
  ========================================== */


const handleLogout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

/* ==========================================
          NOTIFICATIONS
========================================== */

const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
  const saved = localStorage.getItem("notificationsEnabled");

  if (saved === null) {
    return true;
  }

  return JSON.parse(saved);
});

/* ==========================================
          NOTIFICATIONS ON / OFF
========================================== */

const handleNotification = async () => {
  const newValue = !notificationsEnabled;

  // UI immediately change
  setNotificationsEnabled(newValue);

  // Save locally
  localStorage.setItem(
    "notificationsEnabled",
    JSON.stringify(newValue)
  );

  try {
   await axios.put(
  `${import.meta.env.VITE_API_URL}/api/user/settings`,
      {
        notifications: newValue,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log("Backend notification update failed:", error);

    // IMPORTANT:
    // UI ko rollback mat karo.
    // Local toggle already working rahega.
  }
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
    notificationsEnabled
      ? "bg-gradient-to-r from-pink-500 to-violet-600"
      : "bg-gray-300 dark:bg-gray-700"
  }`}
>
  <div
    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
      notificationsEnabled
        ? "left-8"
        : "left-1"
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

  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

    <div className="flex items-center gap-4">

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
          cameraPermission === "Allowed"
            ? "bg-green-100 dark:bg-green-500/20"
            : cameraPermission === "Blocked"
            ? "bg-red-100 dark:bg-red-500/20"
            : "bg-orange-100 dark:bg-orange-500/20"
        }`}
      >
        <MdCameraAlt
          size={28}
          className={
            cameraPermission === "Allowed"
              ? "text-green-600 dark:text-green-400"
              : cameraPermission === "Blocked"
              ? "text-red-600 dark:text-red-400"
              : "text-orange-500 dark:text-orange-400"
          }
        />
      </div>

      <div>

        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Camera Permission
        </h3>

        <p className="mt-1 text-[13px] leading-6 text-[var(--text-secondary)]">
          Camera access is required only when using Live Face Detection.
          Opening the Settings page will never start the camera.
        </p>

      </div>

    </div>

    <span
      className={`rounded-full px-4 py-2 text-xs font-semibold ${
        cameraPermission === "Allowed"
          ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
          : cameraPermission === "Blocked"
          ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
          : "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
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

  {/*======================================
          ACTION BUTTONS
  ====================================== */}



<div className="mt-8 glass rounded-[28px] p-6">

  <div className="mb-6 flex items-center justify-between">

    <div>

      <h3 className="text-xl font-bold text-[var(--text-primary)]">
        Account Actions
      </h3>

      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Manage your account and detection data securely.
      </p>

    </div>

    <div className="rounded-2xl bg-pink-100 p-3 dark:bg-pink-500/20">
      <MdSecurity
        size={26}
        className="text-pink-600 dark:text-pink-400"
      />
    </div>

  </div>

  <div className="grid gap-5 md:grid-cols-2">

    {/* Clear History */}

    <motion.button
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      whileTap={{ scale: .98 }}
      onClick={handleClearHistory}
      className="
      group
      flex
      items-center
      justify-between
      rounded-[24px]
      border
      border-red-200
      bg-red-50
      p-5
      transition-all
      duration-300
      hover:shadow-xl
      dark:border-red-500/20
      dark:bg-red-500/10
      "
    >

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/20">

          <MdDeleteForever
            size={26}
            className="text-red-600 dark:text-red-400"
          />

        </div>

        <div className="text-left">

          <h4 className="font-semibold text-red-600 dark:text-red-400">
            Clear History
          </h4>

          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Remove all saved face detection records.
          </p>

        </div>

      </div>

    </motion.button>

    {/* Logout */}

    <motion.button
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      whileTap={{ scale: .98 }}
      onClick={handleLogout}
      className="
      group
      flex
      items-center
      justify-between
      rounded-[24px]
      bg-gradient-to-r
      from-pink-500
      via-fuchsia-500
      to-violet-600
      p-5
      text-white
      shadow-xl
      transition-all
      duration-300
      hover:shadow-2xl
      "
    >

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">

          <MdLogout size={24} />

        </div>

        <div className="text-left">

          <h4 className="font-semibold">
            Logout
          </h4>

          <p className="mt-1 text-xs text-white/80">
            Securely sign out from your account.
          </p>

        </div>

      </div>

    </motion.button>

  </div>

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
  value: notificationsEnabled ? "Enabled" : "Disabled",
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