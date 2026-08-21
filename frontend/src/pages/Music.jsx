import { motion } from "framer-motion";
import MusicPlayer from "../components/music/MusicPlayer";
import { useEffect, useState } from "react";
import { getRecommendation } from "../services/music.service";
import {
  MdMusicNote,
  MdPsychology,
  MdHeadphones,
} from "react-icons/md";

import {
  FaSmile,
} from "react-icons/fa";

const Music = () => {

const [song, setSong] = useState(null); 
 useEffect(() => {
  const loadSong = async () => {
    try {
      const res = await getRecommendation();

      if (res.success) {
   setSong({
  mood: res.mood,
  title: res.song.title,
  artist: res.song.artist,
  audio: res.song.audio,
  image: res.song.image,
});
      }
    } catch (err) {
      console.log(err);
    }
  };

  loadSong();
}, []);


  return (
<div className="space-y-6">

  {/* ==========================================
                HERO SECTION
  ========================================== */}

  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="glass rounded-[28px] p-6 lg:p-7"
  >

    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* LEFT */}

      <div className="max-w-2xl">

        <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600">

          AI Mood Music

        </span>

        <h1 className="mt-3 text-3xl font-bold text-[var(--text-primary)] lg:text-4xl">

            AI Mood Based Music

        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">

          AI recommends personalized playlists based on your
          latest detected mood to help you relax, focus,
          stay motivated and enjoy a better listening experience.

        </p>
        {song && (
  <div className="mt-4 flex flex-wrap gap-3">
    <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
      Mood : {song.mood}
    </span>

    <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-600">
      {song.title} • {song.artist}
    </span>
  </div>
)}

      </div>

      {/* RIGHT */}

      <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white shadow-[0_18px_45px_rgba(236,72,153,.25)]">

        <MdMusicNote size={40} />

      </div>

    </div>

  </motion.section>

  {/* ==========================================
        MUSIC PLAYER
========================================== */}
{song ? (
  <MusicPlayer song={song} />
) : (
  <div className="glass rounded-3xl p-8 text-center">
    Loading Recommendation...
  </div>
)}

  {/* ==========================================
                FEATURE CARDS
  ========================================== */}

  <section className="grid gap-5 md:grid-cols-3">

    {/* CARD 1 */}

    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-[24px] p-5 transition-all duration-300"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100">

        <FaSmile
          size={24}
          className="text-yellow-500"
        />

      </div>

      <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">

        Mood Analysis

      </h3>

      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">

        AI detects your latest emotion and selects the
        most suitable playlist automatically.

      </p>

    </motion.div>

    {/* CARD 2 */}

    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-[24px] p-5 transition-all duration-300"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100">

        <MdHeadphones
          size={24}
          className="text-pink-600"
        />

      </div>

      <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">

        Auto Play

      </h3>

      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">

        Your recommended playlist starts instantly
        after mood detection.

      </p>

    </motion.div>

    {/* CARD 3 */}

    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-[24px] p-5 transition-all duration-300"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">

        <MdPsychology
          size={24}
          className="text-violet-600"
        />

      </div>

      <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">

        AI Recommendation

      </h3>

      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">

        Smart recommendations improve your mood
        with personalized music.

      </p>

    </motion.div>

  </section>
  {/* ==========================================
              ABOUT AI MUSIC
========================================== */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="glass rounded-[24px] p-5 lg:p-6"
>

  {/* ================= HEADER ================= */}

  <div className="max-w-2xl">

    <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-600">

      AI Recommendation Engine

    </span>

    <h2 className="mt-3 text-xl font-bold text-[var(--text-primary)]">

      How AI Music Recommendation Works

    </h2>

    <p className="mt-2 text-[13px] leading-6 text-[var(--text-secondary)]">

      After every successful face detection, AI analyses your
      facial emotion and instantly recommends the most suitable
      playlist for a personalized listening experience.

    </p>

  </div>

 {/* ================= FEATURES ================= */}

<div className="mt-6 grid gap-4 md:grid-cols-3">

  {/* Happy */}

  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ duration: 0.25 }}
    className="
      rounded-[22px]
      border
      border-[var(--border-color)]
      bg-[var(--card-bg)]
      p-5
      shadow-sm
      transition-all
      duration-300
      hover:border-pink-300
      hover:shadow-xl
    "
  >

    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-lg text-white shadow-md">

      😊

    </div>

    <h3 className="mt-4 text-[16px] font-semibold text-[var(--text-primary)]">

      Happy

    </h3>

    <p className="mt-2 text-[13px] leading-6 text-[var(--text-secondary)]">

      Energetic songs that keep your mood positive,
      active and refreshing throughout the day.

    </p>

  </motion.div>

  {/* Calm */}

  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ duration: 0.25 }}
    className="
      rounded-[22px]
      border
      border-[var(--border-color)]
      bg-[var(--card-bg)]
      p-5
      shadow-sm
      transition-all
      duration-300
      hover:border-violet-300
      hover:shadow-xl
    "
  >

    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-lg text-white shadow-md">

      😌

    </div>

    <h3 className="mt-4 text-[16px] font-semibold text-[var(--text-primary)]">

      Calm

    </h3>

    <p className="mt-2 text-[13px] leading-6 text-[var(--text-secondary)]">

      Peaceful instrumental music designed to reduce
      stress and improve relaxation.

    </p>

  </motion.div>

  {/* Focus */}

  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ duration: 0.25 }}
    className="
      rounded-[22px]
      border
      border-[var(--border-color)]
      bg-[var(--card-bg)]
      p-5
      shadow-sm
      transition-all
      duration-300
      hover:border-cyan-300
      hover:shadow-xl
    "
  >

    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg text-white shadow-md">

      🎯

    </div>

    <h3 className="mt-4 text-[16px] font-semibold text-[var(--text-primary)]">

      Focus

    </h3>

    <p className="mt-2 text-[13px] leading-6 text-[var(--text-secondary)]">

      Lo-fi beats and concentration music to improve
      productivity and deep focus.

    </p>

  </motion.div>

</div>

  {/* ================= CTA ================= */}

  <div className="mt-6 rounded-[22px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 p-5 text-white">

    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="max-w-2xl">

        <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">

          Smart Recommendation

        </span>

        <h3 className="mt-3 text-xl font-bold">

          Personalized Music For Every Mood

        </h3>

        <p className="mt-2 text-[13px] leading-6 text-white/90">

          Every playlist is generated according to your latest
          detected emotion to help you stay relaxed, focused,
          motivated and emotionally balanced.

        </p>

      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-lg">

        <MdMusicNote
          size={34}
          className="text-white"
        />

      </div>

    </div>

  </div>

</motion.section>
{/* ==========================================
            MUSIC INSIGHTS
========================================== */}

<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="grid gap-5 lg:grid-cols-2"
>

   {/* ================= LEFT ================= */}

  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
    className="glass rounded-[24px] border border-[var(--border-color)] p-5"
  >

    <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600">

      AI Statistics

    </span>

    <h2 className="mt-3 text-xl font-bold text-[var(--text-primary)]">

      Music Recommendation Insights

    </h2>

    <p className="mt-3 text-[13px] leading-6 text-[var(--text-secondary)]">

      Our recommendation engine analyses mood,
      listening behaviour and emotion confidence
      to generate personalized playlists.

    </p>

    <div className="mt-6 grid grid-cols-3 gap-3">

      {/* Accuracy */}

      <div className="rounded-2xl border border-pink-200/40 bg-[var(--card-bg)] p-4 text-center shadow-sm">

        <h3 className="text-xl font-bold text-pink-500">

          98%

        </h3>

        <p className="mt-1 text-[11px] text-[var(--text-secondary)]">

          Accuracy

        </p>

      </div>

      {/* Songs */}

      <div className="rounded-2xl border border-violet-200/40 bg-[var(--card-bg)] p-4 text-center shadow-sm">

        <h3 className="text-xl font-bold text-violet-500">

          250+

        </h3>

        <p className="mt-1 text-[11px] text-[var(--text-secondary)]">

          Songs

        </p>

      </div>

      {/* AI */}

      <div className="rounded-2xl border border-cyan-200/40 bg-[var(--card-bg)] p-4 text-center shadow-sm">

        <h3 className="text-xl font-bold text-cyan-500">

          24/7

        </h3>

        <p className="mt-1 text-[11px] text-[var(--text-secondary)]">

          AI Active

        </p>

      </div>

    </div>

  </motion.div>

  {/* ================= RIGHT ================= */}

  <motion.div
    whileHover={{
      scale: 1.02,
      y: -4,
    }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden rounded-[24px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 p-6 shadow-[0_15px_40px_rgba(168,85,247,.25)]"
  >

    <div className="flex h-full flex-col justify-between">

      <div>

        <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">

          Premium Feature

        </span>

        <h2 className="mt-4 text-2xl font-bold text-white">

          Enjoy Every Mood

        </h2>

        <p className="mt-3 text-[13px] leading-6 text-white/90">

          Discover AI-generated playlists designed
          to improve focus, reduce stress and
          enhance your listening experience.

        </p>

      </div>

      <button className="mt-6 w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-pink-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

        Explore Playlist →

      </button>

    </div>

  </motion.div>

</motion.section>

{/* ==========================================
              FOOTER NOTE
========================================== */}

<motion.div
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  transition={{ duration: 0.3 }}
  className="glass rounded-[24px] border border-[var(--border-color)] p-5 text-center shadow-sm"
>

  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-2xl text-white shadow-lg">

    🎵

  </div>

  <span className="mt-4 inline-block rounded-full bg-pink-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-600">

    AI Recommendation

  </span>

  <h3 className="mt-4 text-xl font-bold text-[var(--text-primary)]">

    AI Powered Mood Music

  </h3>

  <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-[var(--text-secondary)]">

    Every playlist is intelligently generated using your latest
    detected emotion, delivering a personalized listening
    experience that adapts to your mood in real time.

  </p>

  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">

    <span className="rounded-full bg-pink-100/80 px-3 py-1 text-[11px] font-medium text-pink-600">

      🎧 Smart Playlist

    </span>

    <span className="rounded-full bg-violet-100/80 px-3 py-1 text-[11px] font-medium text-violet-600">

      🤖 AI Generated

    </span>

    <span className="rounded-full bg-cyan-100/80 px-3 py-1 text-[11px] font-medium text-cyan-600">

      ⚡ Real-Time Mood

    </span>

  </div>

</motion.div>

</div>
  );
};

export default Music;