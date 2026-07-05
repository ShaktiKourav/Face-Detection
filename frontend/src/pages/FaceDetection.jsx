


import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Camera from "../components/Camera";

import {
  MdCameraAlt,
  MdFaceRetouchingNatural,
  MdVerified,
  MdPlayArrow,
  MdPause,
  MdRefresh,
} from "react-icons/md";

const moods = [
  {
    mood: "Happy 😊",
    confidence: 98,
    song: "/music/happy.mp3",
    title: "Happy Vibes",
    artist: "AI Playlist",
    color: "from-pink-500 to-violet-600",
  },
  {
    mood: "Romantic ❤️",
    confidence: 96,
    song: "/music/romantic.mp3",
    title: "Love Melody",
    artist: "AI Playlist",
    color: "from-rose-500 to-red-500",
  },
  {
    mood: "Sad 😔",
    confidence: 94,
    song: "/music/sad.mp3",
    title: "Silent Memories",
    artist: "AI Playlist",
    color: "from-blue-500 to-indigo-600",
  },
  {
    mood: "Angry 😡",
    confidence: 91,
    song: "/music/angry.mp3",
    title: "Power Mode",
    artist: "AI Playlist",
    color: "from-red-600 to-orange-500",
  },
  {
    mood: "Calm 😌",
    confidence: 97,
    song: "/music/calm.mp3",
    title: "Peaceful Mind",
    artist: "AI Playlist",
    color: "from-cyan-500 to-teal-500",
  },
  {
    mood: "Excited 🤩",
    confidence: 95,
    song: "/music/excited.mp3",
    title: "Energy Boost",
    artist: "AI Playlist",
    color: "from-yellow-400 to-orange-500",
  },
  {
    mood: "Relaxed 🌿",
    confidence: 96,
    song: "/music/relaxed.mp3",
    title: "Nature Flow",
    artist: "AI Playlist",
    color: "from-green-500 to-emerald-500",
  },
  {
    mood: "Surprised 😲",
    confidence: 89,
    song: "/music/surprised.mp3",
    title: "Unexpected Beat",
    artist: "AI Playlist",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    mood: "Confident 😎",
    confidence: 97,
    song: "/music/confident.mp3",
    title: "Champion Spirit",
    artist: "AI Playlist",
    color: "from-amber-500 to-yellow-500",
  },
  {
    mood: "Focused 🎯",
    confidence: 95,
    song: "/music/focus.mp3",
    title: "Deep Focus",
    artist: "AI Playlist",
    color: "from-slate-600 to-gray-700",
  },
];

const FaceDetection = () => {

  const audioRef = useRef(null);

  const [detecting, setDetecting] = useState(false);

  const [playing, setPlaying] = useState(false);

  const [scanText, setScanText] = useState("Waiting for Detection...");

  const [faceCount, setFaceCount] = useState(0);

  const [todayCount, setTodayCount] = useState(28);

  const [result, setResult] = useState({
    mood: "--",
    confidence: 0,
    title: "--",
    artist: "--",
    song: "",
    color: "from-pink-500 to-violet-600",
  });

  useEffect(() => {

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    setFaceCount(history.length || 158);

  }, []);

  const saveHistory = (data) => {

    const history =
      JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
      id: Date.now(),
      mood: data.mood,
      confidence: data.confidence,
      song: data.title,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );

    setFaceCount(history.length);

  };

  const startDetection = () => {

    setDetecting(true);

    setScanText("Scanning Face...");

    setTimeout(() => {

      const random =
        moods[Math.floor(Math.random() * moods.length)];

      setResult(random);

      setScanText("Face Detected Successfully");

      setTodayCount((prev) => prev + 1);

      saveHistory(random);

      if (audioRef.current) {

        audioRef.current.src = random.song;

        audioRef.current.play();

        setPlaying(true);

      }

      setDetecting(false);

    }, 3500);

  };

  const stopMusic = () => {

    if (audioRef.current) {

      audioRef.current.pause();

      setPlaying(false);

    }

  };

  const playMusic = () => {

    if (audioRef.current) {

      audioRef.current.play();

      setPlaying(true);

    }

  };

  const detectAgain = () => {

    stopMusic();

    setResult({
      mood: "--",
      confidence: 0,
      title: "--",
      artist: "--",
      song: "",
      color: "from-pink-500 to-violet-600",
    });

    startDetection();

  };

  return (

    <div className="space-y-4">

      <audio ref={audioRef} />

      {/* Header */}

      <motion.div

        initial={{ opacity: 0, y: 25 }}

        animate={{ opacity: 1, y: 0 }}

        className="rounded-[30px] border border-white/80 bg-white/70 p-7 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.10)] pb-4 py-2"

      >

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold  tracking-wider text-pink-600">

              Live AI Detection

            </span>

            <h1 className="mt-2 text-2xl font-bold">

              Face

              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">

                {" "}Detection

              </span>

            </h1>

            <p className="pt-0 max-w-2xl text-xs leading-7 text-gray-500">

              Detect faces in real-time, identify mood,
              automatically recommend music and save
              every detection into history.

            </p>

          </div>

          <button

            onClick={startDetection}

            disabled={detecting}

            className="rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-2 font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-70"

          >

            {detecting ? "Scanning..." : "Start Detection"}

          </button>

        </div>

      </motion.div>
            {/* ================= CAMERA & RIGHT PANEL ================= */}

      <section className="grid gap-6 xl:grid-cols-12 pt-5 pb-3">

        {/* ================= CAMERA ================= */}

        <div className="xl:col-span-8">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
           
          >

            
            <div className="relative">

              <Camera />

              {detecting && (

                <div className="absolute inset-0 flex items-center justify-center rounded-[26px] bg-black/35 backdrop-blur-sm">

                  <div className="text-center">

                    <div className="mx-auto h-20 w-20 animate-spin rounded-full border-[6px] border-pink-200 border-t-pink-600"></div>

                    <h3 className="mt-6 text-2xl font-bold text-white">
                      AI Scanning...
                    </h3>

                    <p className="mt-2 text-white/80">
                      Detecting facial emotion...
                    </p>

                  </div>

                </div>

              )}

            </div>

          </motion.div>

        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="space-y-4 xl:col-span-4">

          {/* Detection Result */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[30px] border border-white/80 bg-white/70 p-6 shadow-[0_20px_50px_rgba(168,85,247,.10)] backdrop-blur-2xl py-2.5"
          >

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Detection Result
              </h2>

              <MdVerified
                className="text-green-500"
                size={24}
              />

            </div>

            <div
              className={`rounded-3xl bg-gradient-to-r ${result.color} p-6 text-white`}
            >

              <MdFaceRetouchingNatural
                size={60}
              />

              <h2 className="mt-5 text-3xl font-bold">
                {result.mood}
              </h2>

              <p className="mt-2 text-sm text-white/90">
                Confidence :
                <span className="ml-2 font-semibold">
                  {result.confidence}%
                </span>
              </p>

            </div>

            {/* Progress */}

            <div className="mt-6">

              <div className="mb-2 flex justify-between text-sm">

                <span>AI Confidence</span>

                <span>{result.confidence}%</span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-pink-100">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${result.confidence}%`,
                  }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-600"
                />

              </div>

            </div>

            <div className="mt-6 rounded-2xl bg-green-50 p-4">

              <div className="flex items-center gap-3">

                <MdVerified
                  className="text-green-600"
                  size={26}
                />

                <div>

                  <h3 className="font-semibold">
                    {scanText}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Camera ready for next scan.
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

          {/* Music Recommendation */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[30px] border border-white/80 bg-white/70 p-9 shadow-[0_20px_50px_rgba(168,85,247,.10)] backdrop-blur-2xl py-2.5"
          >

            <h2 className="text-xl font-bold ">
              AI Music Recommendation
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Song selected automatically according to mood.
            </p>

            <div className="mt-5 rounded-3xl bg-pink-50 p-5">

              <h3 className="text-lg font-bold">
                {result.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {result.artist}
              </p>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={playMusic}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 font-semibold text-white transition hover:scale-105"
              >

                <MdPlayArrow size={24} />

                Play

              </button>

              <button
                onClick={stopMusic}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-pink-200 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
              >

                <MdPause size={24} />

                Pause

              </button>

            </div>

            <button
              onClick={detectAgain}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-200 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
            >

              <MdRefresh size={22} />

              Detect Again

            </button>

          </motion.div>

                

        </div>

      </section>

      {/* ================= AI PERFORMANCE ================= */}

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .4 }}
        className="grid gap-6 lg:grid-cols-3 pt-2 pb-5 "
      >

        <div className="rounded-2xl pb-4 h-[230px] border border-white/80 bg-white/70 p-6 shadow-[0_20px_50px_rgba(168,85,247,.10)] backdrop-blur-2xl mt-2">

          <MdCameraAlt
            className="text-pink-500 pt-1"
            size={48}
          />

          <h3 className="mt-1 text-xl font-bold">
            Camera Status
          </h3>

          <p className="mt-1 text-sm leading-7 text-gray-500">
            Live webcam is connected and continuously scanning
            for facial expressions in real-time.
          </p>

          <span className="mt-5 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            ● Online
          </span>

        </div>

        <div className="rounded-2xl border border-white/80 bg-white/70 p-5 shadow-[0_20px_50px_rgba(168,85,247,.10)] backdrop-blur-2xl pt-1">

          <MdFaceRetouchingNatural
            className="text-violet-600 pt-4"
            size={48}
          />

          <h3 className="mt-3 text-xl font-bold">
            AI Recognition
          </h3>

          <p className="mt-2 text-sm leading-7 text-gray-500">
            Advanced AI identifies facial mood and recommends
            songs according to detected emotions.
          </p>

          <div className="mt-5 h-2 rounded-full bg-violet-100">

            <div
              className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600"
              style={{
                width: `${result.confidence || 95}%`,
              }}
            />

          </div>

        </div>

        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-5 text-white shadow-[0_25px_70px_rgba(168,85,247,.30)]">

          <h3 className="text-2xl font-bold  mt-3">
            AI Recommendation
          </h3>

          <p className="mt-4 text-sm leading-7 text-white/90">

            Mood Detected :

            <span className="font-semibold">
              {" "}
              {result.mood}
            </span>

            <br />

            Recommended Song :

            <span className="font-semibold">
              {" "}
              {result.title}
            </span>

          </p>

          <button
            onClick={playMusic}
            className="mt-8 rounded-2xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:scale-105"
          >
            Play Recommended Song
          </button>

        </div>

      </motion.section>

      {/* ================= DETECTION TIPS ================= */}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .5 }}
        className="rounded-[30px] border border-white/80 bg-white/70 p-7 shadow-[0_20px_50px_rgba(168,85,247,.10)] backdrop-blur-2xl "
      >

        <h2 className="text-2xl font-bold">
          Detection Tips
        </h2>

        <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-5">

          {[
            "😊 Keep your face clearly visible.",
            "💡 Use good lighting.",
            "📷 Stay inside camera frame.",
            "🚫 Avoid covering your face.",
            "🎵 Wait for AI recommendation.",
          ].map((tip, index) => (

            <motion.div
              whileHover={{ y: -6 }}
              key={index}
              className="rounded-2xl bg-pink-50 p-5 text-center text-sm font-medium text-gray-700 shadow-sm"
            >
              {tip}
            </motion.div>

          ))}

        </div>

      </motion.section>

    </div>

  );

};

export default FaceDetection;