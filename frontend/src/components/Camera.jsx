import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

import axios from "axios";
import {
  MdCameraAlt,
  MdCamera,
  MdStop,
  MdDownload,
  MdRefresh,
} from "react-icons/md";

const Camera = () => {
  const webcamRef = useRef(null);
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);
  const [result, setResult] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

 const capture = async () => {
  const image = webcamRef.current?.getScreenshot();

  if (!image) return;

  setImage(image);

  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/detection/capture",
      {
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResult(res.data);
    setMood(res.data.mood);
    setConfidence(res.data.confidence);
    setSong(res.data.song);

    console.log(res.data);

  } catch (error) {
    console.log(error);
  }
};
  const downloadImage = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.download = "face-detection.png";
    link.click();
  };

  useEffect(() => {
  if (!cameraOn) return;

  const interval = setInterval(() => {
    capture();
  }, 2000);

  return () => clearInterval(interval);

}, [cameraOn]);


  useEffect(() => {
  if (song && audioRef.current) {
    audioRef.current.load();

    audioRef.current.play().catch((err) => {
      console.log("Autoplay blocked:", err);
    });
  }
}, [song]);

useEffect(() => {
  if (result?.song && audioRef.current) {
    audioRef.current.load();

    audioRef.current.play().catch((err) => {
      console.log(err);
    });
  }
}, [result]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)] pb-30 py-3"
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between ">
        <div>
          <h2 className="text-2xl font-bold pt-2">
            Live Face Detection
          </h2>

          <p className="text-gray-500 text-sm pt-0">
            Camera Preview
          </p>
        </div>

        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            cameraOn
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {cameraOn ? "● LIVE" : "● OFFLINE"}
        </div>
      </div>

      {/* Camera */}

      <div className="overflow-hidden rounded-3xl  bg-gray-100 p-4 min-h-[600px]">

        {cameraOn ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-[450px] flex-col items-center justify-center">
            <MdCameraAlt
              size={90}
              className="text-violet-400"
            />

            <p className="mt-4 text-gray-500">
              Camera is turned off
            </p>
          </div>
        )}

      </div>

      {/* Buttons */}

      <div className="mt-8 flex flex-wrap gap-4 ">

        {!cameraOn ? (
          <button
            onClick={() => setCameraOn(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105  mb-3 "
          >
            <MdCamera />

            Start Camera
          </button>
        ) : (
          <>
            <button
              onClick={capture}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <MdCameraAlt />

              Capture
            </button>

            <button
              onClick={() => {
                setCameraOn(false);
                setImage(null);
              }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <MdStop />

              Stop Camera
            </button>
          </>
        )}

        <button
          onClick={() => setImage(null)}
          className="flex items-center gap-2 rounded-xl bg-violet-100 px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-200"
        >
          <MdRefresh />

          Reset
        </button>

      </div>


        
      {/* Captured Image */}

      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10"
        >
          <h3 className="mb-4  text-xl font-bold">
            Captured Image
          </h3>

          <div className="overflow-hidden rounded-3xl">
            <img
              src={image}
              alt="Captured Face"
              className="w-full rounded-3xl"
            />
          </div>

          <button
            onClick={downloadImage}
            className="mt-5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <MdDownload />

            Download Image
          </button>


        {song && (
  <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg">
    <h3 className="text-xl font-bold mb-3">
      AI Detection
    </h3>

    <p><strong>Mood:</strong> {mood}</p>

    <p><strong>Confidence:</strong> {confidence}%</p>

    <p><strong>Song:</strong> {song.title}</p>

    <audio controls className="mt-3 w-full">
      <source
        src={`http://localhost:5000${song.audio}`}
        type="audio/mpeg"
      />
    </audio>
  </div>
)}




          {/* Detection Result */}

    {result && (
      <div className="mt-8 rounded-3xl border border-violet-200 bg-gradient-to-r from-pink-50 to-violet-50 p-6 shadow-lg">

        <h3 className="mb-5 text-2xl font-bold text-violet-700">
          AI Detection Result
        </h3>

        <div className="space-y-3">

          <p>
            <span className="font-semibold">Mood:</span>{" "}
            {result.mood}
          </p>

          <p>
            <span className="font-semibold">Confidence:</span>{" "}
            {result.confidence}%
          </p>
          
      </div>
         {/* 👇 YAHAN ADD KARO */}

    {song && (
      <div className="mt-6">

        <h3 className="text-xl font-bold">
          Recommended Song
        </h3>

        <p>{song.title}</p>

       <audio
       ref={audioRef}
       controls
       autoPlay
       className="mt-3 w-full"
      >
  <source
    src={`http://localhost:5000${result.song.audio}`}
    type="audio/mpeg"
  />
</audio>

      </div>
    )}

    </div>
    )}

        </motion.div>
      )}
    </motion.div>
  );
};

export default Camera;