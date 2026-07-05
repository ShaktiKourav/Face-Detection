import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MdNotifications,
  MdCameraAlt,
  MdVolumeUp,
  MdDarkMode,
  MdPerson,
  MdSave,
} from "react-icons/md";

function Toggle({ title, desc, enabled, setEnabled }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>

      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`h-7 w-14 rounded-full ${
          enabled
            ? "bg-gradient-to-r from-pink-500 to-violet-600"
            : "bg-gray-300"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white transition ${
            enabled ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function Select({ title, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-gray-700">
        {title}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-violet-100 bg-white px-5 py-4 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Input({
  title,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-gray-700">
        {title}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-2xl
          border
          border-violet-100
          bg-white
          px-5
          py-4
          outline-none
          transition
          focus:border-pink-400
          focus:ring-4
          focus:ring-pink-100
        "
      />
    </div>
  );
}


const Setting = () => {

  // ===========================
  // Logged In User
  // ===========================

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // ===========================
  // General Settings
  // ===========================

  const [notifications, setNotifications] = useState(() => {
    return JSON.parse(localStorage.getItem("notifications")) ?? true;
  });

  const [camera, setCamera] = useState(() => {
    return JSON.parse(localStorage.getItem("camera")) ?? true;
  });

  const [sound, setSound] = useState(() => {
    return JSON.parse(localStorage.getItem("sound")) ?? true;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) ?? false;
  });

  // ===========================
  // Camera Settings
  // ===========================

  const [cameraQuality, setCameraQuality] = useState(() => {
    return localStorage.getItem("cameraQuality") || "1080p";
  });

  const [detectionSpeed, setDetectionSpeed] = useState(() => {
    return localStorage.getItem("detectionSpeed") || "Balanced";
  });

  const [captureFormat, setCaptureFormat] = useState(() => {
    return localStorage.getItem("captureFormat") || "PNG";
  });

  // ===========================
  // Profile Settings
  // ===========================

  const [profile, setProfile] = useState({

    name: user.name || "",

    email: user.email || "",

    phone: user.phone || "",

    location: user.location || "",

  });

  // ===========================
  // Input Change
  // ===========================

  const handleProfileChange = (e) => {

    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ===========================
  // Save General Settings
  // ===========================

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "camera",
      JSON.stringify(camera)
    );
  }, [camera]);

  useEffect(() => {
    localStorage.setItem(
      "sound",
      JSON.stringify(sound)
    );
  }, [sound]);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  // ===========================
  // Save Camera Settings
  // ===========================

  useEffect(() => {
    localStorage.setItem(
      "cameraQuality",
      cameraQuality
    );
  }, [cameraQuality]);

  useEffect(() => {
    localStorage.setItem(
      "detectionSpeed",
      detectionSpeed
    );
  }, [detectionSpeed]);

  useEffect(() => {
    localStorage.setItem(
      "captureFormat",
      captureFormat
    );
  }, [captureFormat]);

  // ===========================
  // Dark Mode
  // ===========================

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark");

    } else {

      document.documentElement.classList.remove("dark");

    }

  }, [darkMode]);

  // ===========================
  // Save Profile
  // ===========================

  const handleSave = () => {

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ...profile,
      })
    );

    alert("Settings Saved Successfully ✅");

  };



  return (
  <div className="space-y-6">

    {/* ================= HEADER ================= */}

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)] py-2.5"
    >
      <h1 className="text-2xl font-bold">
        System{" "}
        <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
          Settings
        </span>
      </h1>

      <p className="mt-0 text-xs text-gray-500">
        Manage your account, camera preferences and application settings.
      </p>
    </motion.div>

    {/* ================= TOP GRID ================= */}

    <div className="grid gap-8 lg:grid-cols-2">

      {/* ================= GENERAL SETTINGS ================= */}

      <motion.div
        whileHover={{ y: -5 }}
        className="rounded-3xl border border-white/80 bg-white/70 p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]"
      >
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">

          <MdNotifications
            className="text-pink-500"
            size={28}
          />

          General Settings

        </h2>

        <div className="space-y-5">

          <Toggle
            title="Notifications"
            desc="Receive emotion detection notifications."
            enabled={notifications}
            setEnabled={setNotifications}
          />

          <Toggle
            title="Camera Access"
            desc="Allow browser webcam permission."
            enabled={camera}
            setEnabled={setCamera}
          />

          <Toggle
            title="System Sound"
            desc="Play sound after successful detection."
            enabled={sound}
            setEnabled={setSound}
          />

          <Toggle
            title="Dark Mode"
            desc="Enable premium dark interface."
            enabled={darkMode}
            setEnabled={setDarkMode}
          />

        </div>

      </motion.div>

      {/* ================= CAMERA SETTINGS ================= */}

      <motion.div
        whileHover={{ y: -5 }}
        className="rounded-3xl border border-white/80 bg-white/70 p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]"
      >

        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">

          <MdCameraAlt
            className="text-violet-600"
            size={28}
          />

          Camera Settings

        </h2>

        <div className="space-y-6">

          <Select
            title="Camera Quality"
            value={cameraQuality}
            onChange={setCameraQuality}
            options={[
              "720p",
              "1080p",
              "4K",
            ]}
          />

          <Select
            title="Detection Speed"
            value={detectionSpeed}
            onChange={setDetectionSpeed}
            options={[
              "Fast",
              "Balanced",
              "High Accuracy",
            ]}
          />

          <Select
            title="Capture Format"
            value={captureFormat}
            onChange={setCaptureFormat}
            options={[
              "PNG",
              "JPG",
              "WEBP",
            ]}
          />

        </div>

      </motion.div>

    </div>
      
    
 {/* ================= PROFILE SETTINGS ================= */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -4,
    boxShadow: "0 25px 60px rgba(168,85,247,.18) ",
  }}
  transition={{ duration: .35 }}
  className="
    relative
    overflow-hidden
    rounded-[32px]
    border
    border-white/80
    bg-white/70
    p-8
    backdrop-blur-2xl
    shadow-[0_20px_60px_rgba(168,85,247,.12)]
    mb-2
  "
>

  {/* Glow */}

  <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-pink-300/20 blur-[100px]" />

  <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-violet-300/20 blur-[90px]" />

  {/* Header */}

  <div className="relative mb-8 flex items-center gap-5">

    <div className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      bg-gradient-to-r
      from-pink-500
      via-fuchsia-500
      to-violet-600
      text-white
      shadow-[0_15px_35px_rgba(236,72,153,.25)]
    ">

      <MdPerson size={20} />

    </div>

    <div>

      <h2 className="text-2xl font-bold text-gray-900">
        Profile Settings
      </h2>

      <p className="mt-0 text-sm text-gray-500">
        Update your personal information and account details.
      </p>

    </div>

  </div>

  {/* Inputs */}

  <div className="relative grid gap-7 md:grid-cols-2">

    <Input
      title="Full Name"
      name="name"
      value={profile.name}
      onChange={handleProfileChange}
    />

    <Input
      title="Email Address"
      name="email"
      value={profile.email}
      onChange={handleProfileChange}
    />

    <Input
      title="Phone Number"
      name="phone"
      value={profile.phone}
      onChange={handleProfileChange}
    />

    <Input
      title="Location"
      name="location"
      value={profile.location}
      onChange={handleProfileChange}
    />

  </div>

</motion.div>

    {/* ================= SAVE BUTTON ================= */}

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .3 }}
      className="flex justify-end "
    >

      <button
        onClick={handleSave}
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-violet-600
          px-6
          py-3
          mt-0
          font-semibold
          text-white
          shadow-[0_15px_40px_rgba(168,85,247,.25)]
          transition
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_20px_50px_rgba(168,85,247,.35)]
        "
      >

        <MdSave size={24} />

        Save Changes

      </button>

    </motion.div>

  </div>
);

}

export default Setting;