import { useState } from "react";
import { motion } from "framer-motion";

import Camera from "../components/detection/Camera";
import MoodResult from "../components/detection/MoodResult";

import {
  MdFaceRetouchingNatural,
  MdOutlineCameraAlt,
  MdVerified,
} from "react-icons/md";

const Detection = () => {

  const [result, setResult] = useState(null);

  /* ==========================================
        CAPTURE IMAGE
  ========================================== */

  const handleCapture = async (image) => {

    try {

      /*
      Backend Ready

      const response = await api.post("/detect",{
          image
      });

      setResult(response.data);
      */

      // Demo Data

      setTimeout(() => {

        setResult({

          mood: "Happy 😊",

          confidence: 98,

          song: "Happy Vibes",

          time: new Date().toLocaleTimeString(),

          date: new Date().toLocaleDateString(),

        });

      },1000);

    }

    catch(error){

      console.log(error);

    }

  };

  return (

<div className="space-y-8">

{/* =====================================
            HEADER
===================================== */}


<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  className="
  relative
  overflow-hidden
  rounded-[30px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  backdrop-blur-3xl
  shadow-[var(--shadow-lg)]
  "
>

  {/* Background Glow */}

  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-500/10 blur-[110px]" />

  <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

  <div
    className="
    relative
    flex
    flex-col
    gap-6
    px-6
    py-6
    lg:flex-row
    lg:items-center
    lg:justify-between
    "
  >

    {/* Left */}

    <div className="max-w-3xl">

      <span
        className="
        inline-flex
        items-center
        rounded-full
        bg-gradient-to-r
        from-pink-500/15
        to-violet-500/15
        px-4
        py-1.5
        text-[10px]
        font-semibold
        uppercase
        tracking-[2px]
        text-pink-500
        "
      >
        Live AI Detection
      </span>

      <h1
        className="
        mt-4
        text-3xl
        font-bold
        leading-tight
        text-[var(--text-primary)]
        "
      >
        Face Detection

        <span
          className="
          ml-2
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-violet-600
          bg-clip-text
          text-transparent
          "
        >
          Engine
        </span>

      </h1>

      <p
        className="
        mt-3
        max-w-2xl
        text-sm
        leading-7
        text-[var(--text-secondary)]
        "
      >
        Capture your face using the webcam. Our AI detects
        facial landmarks, predicts emotions with confidence,
        stores history securely and recommends music
        according to your mood in real time.
      </p>

      {/* Status Chips */}

      <div className="mt-5 flex flex-wrap gap-3">

        <span
          className="
          rounded-full
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          px-4
          py-2
          text-xs
          font-medium
          text-[var(--text-primary)]
          backdrop-blur-xl
          "
        >
          🎥 HD Camera
        </span>

        <span
          className="
          rounded-full
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          px-4
          py-2
          text-xs
          font-medium
          text-[var(--text-primary)]
          backdrop-blur-xl
          "
        >
          🤖 AI Ready
        </span>

        <span
          className="
          rounded-full
          border
          border-[var(--border-color)]
          bg-[var(--glass)]
          px-4
          py-2
          text-xs
          font-medium
          text-[var(--text-primary)]
          backdrop-blur-xl
          "
        >
          😊 Mood Analysis
        </span>

      </div>

    </div>

   
      {/* =====================================================
                        RIGHT SIDE
    ===================================================== */}

       {/* =====================================================
                    HEADER STATUS CARDS
    ===================================================== */}

    <div
      className="
      grid
      gap-4
      sm:grid-cols-3
      lg:grid-cols-1
      xl:grid-cols-3
      "
    >

      {/* HD Camera */}

      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        transition={{ duration: 0.25 }}
        className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        text-center
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-pink-300
        hover:shadow-lg
        "
      >

        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-pink-500/10 blur-3xl" />

        <div
          className="
          relative
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-pink-500
          via-fuchsia-500
          to-violet-600
          text-white
          shadow-lg
          "
        >
          <MdOutlineCameraAlt size={24} />
        </div>

        <h3
          className="
          mt-3
          text-sm
          font-semibold
          text-[var(--text-primary)]
          "
        >
          HD Camera
        </h3>

        <p
          className="
          mt-1
          text-[11px]
          text-[var(--text-secondary)]
          "
        >
          1280 × 720 Resolution
        </p>

      </motion.div>

      {/* AI Ready */}

      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        transition={{ duration: 0.25 }}
        className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        text-center
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-violet-300
        hover:shadow-lg
        "
      >

        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl" />

        <div
          className="
          relative
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-violet-500
          to-purple-600
          text-white
          shadow-lg
          "
        >
          <MdVerified size={24} />
        </div>

        <h3
          className="
          mt-3
          text-sm
          font-semibold
          text-[var(--text-primary)]
          "
        >
          AI Ready
        </h3>

        <p
          className="
          mt-1
          text-[11px]
          text-[var(--text-secondary)]
          "
        >
          Detection Active
        </p>

      </motion.div>

      {/* Mood Analysis */}

      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        transition={{ duration: 0.25 }}
        className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        text-center
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-300
        hover:shadow-lg
        "
      >

        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl" />

        <div
          className="
          relative
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-cyan-500
          to-blue-600
          text-white
          shadow-lg
          "
        >
          <MdFaceRetouchingNatural size={24} />
        </div>

        <h3
          className="
          mt-3
          text-sm
          font-semibold
          text-[var(--text-primary)]
          "
        >
          Mood Analysis
        </h3>

        <p
          className="
          mt-1
          text-[11px]
          text-[var(--text-secondary)]
          "
        >
          AI Emotion Recognition
        </p>

      </motion.div>

    </div>

  </div>

</motion.section>


{/* =====================================
        CAMERA + RESULT
===================================== */}

<div className="grid gap-8 xl:grid-cols-[1.25fr_.75fr]">

<Camera

onCapture={handleCapture}

/>

<MoodResult

result={result}

/>

</div>

{/* =====================================================
            HOW AI DETECTION WORKS
===================================================== */}

<motion.section
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.35 }}
  className="
  relative
  overflow-hidden
  rounded-[28px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  backdrop-blur-2xl
  shadow-[var(--shadow)]
  "
>

  {/* Background Glow */}

  <div className="absolute -top-24 -left-24 h-60 w-60 rounded-full bg-pink-500/10 blur-[100px]" />

  <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

  {/* Header */}

  <div className="relative border-b border-[var(--border-color)] px-6 py-5">

    <div className="flex flex-wrap items-center justify-between gap-5">

      <div className="flex items-center gap-4">

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-pink-500
          via-fuchsia-500
          to-violet-600
          text-white
          shadow-lg
          "
        >
          <MdFaceRetouchingNatural size={28} />
        </div>

        <div>

          <span
            className="
            inline-flex
            rounded-full
            bg-pink-500/10
            px-3
            py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-[2px]
            text-pink-500
            "
          >
            AI Workflow
          </span>

          <h2
            className="
            mt-2
            text-xl
            font-bold
            text-[var(--text-primary)]
            "
          >
            How Detection Works
          </h2>

          <p
            className="
            mt-1
            text-sm
            text-[var(--text-secondary)]
            "
          >
            Complete AI detection pipeline from camera to music recommendation.
          </p>

        </div>

      </div>

      <div
        className="
        rounded-2xl
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        px-4
        py-2
        text-xs
        font-semibold
        text-[var(--text-secondary)]
        backdrop-blur-xl
        "
      >
        4 Processing Steps
      </div>

    </div>

  </div>

  {/* Steps */}

  <div
    className="
    relative
    grid
    gap-5
    p-6
    md:grid-cols-2
    xl:grid-cols-4
    "
  >    {[
      {
        no: "01",
        title: "Start Camera",
        desc: "Allow webcam access to begin live face detection.",
        color: "from-pink-500 via-fuchsia-500 to-violet-600",
      },
      {
        no: "02",
        title: "Capture Face",
        desc: "Capture a clear frontal face image for accurate prediction.",
        color: "from-violet-500 to-purple-600",
      },
      {
        no: "03",
        title: "AI Analysis",
        desc: "AI detects facial landmarks, predicts emotion and confidence.",
        color: "from-cyan-500 to-blue-600",
      },
      {
        no: "04",
        title: "Recommendation",
        desc: "History is saved and music is recommended instantly.",
        color: "from-orange-500 to-red-500",
      },
    ].map((step) => (

      <motion.div
        key={step.no}
        whileHover={{
          y: -6,
          scale: 1.02,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-pink-300
        hover:shadow-xl
        "
      >

        {/* Glow */}

        <div
          className={`
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-gradient-to-br
          ${step.color}
          opacity-10
          blur-3xl
          `}
        />

        {/* Step Number */}

        <div
          className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          ${step.color}
          text-sm
          font-bold
          text-white
          shadow-lg
          `}
        >
          {step.no}
        </div>

        {/* Title */}

        <h3
          className="
          mt-5
          text-lg
          font-semibold
          text-[var(--text-primary)]
          "
        >
          {step.title}
        </h3>

        {/* Description */}

        <p
          className="
          mt-3
          text-sm
          leading-7
          text-[var(--text-secondary)]
          "
        >
          {step.desc}
        </p>

      </motion.div>

    ))}

  </div>

  {/* ==========================================
              FOOTER INFO
  ========================================== */}

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
      gap-4
      lg:flex-row
      lg:items-center
      lg:justify-between
      "
    >

      <div>

        <h3
          className="
          text-lg
          font-bold
          text-[var(--text-primary)]
          "
        >
          AI Face Detection Pipeline
        </h3>

        <p
          className="
          mt-2
          text-sm
          leading-7
          text-[var(--text-secondary)]
          "
        >
          Every detection is processed through a secure AI pipeline that
          performs face detection, emotion recognition, confidence scoring,
          history storage and personalized music recommendation.
        </p>

      </div>

      <div
        className="
        rounded-2xl
        bg-gradient-to-r
        from-pink-500
        via-fuchsia-500
        to-violet-600
        px-5
        py-3
        text-center
        text-white
        shadow-lg
        "
      >

        <p className="text-xs text-pink-100">

          AI Status

        </p>

        <h4 className="mt-1 text-lg font-bold">

          Ready ✓

        </h4>

      </div>

    </div>

  </div>

</motion.section>

</div> 

  )


};

export default Detection;