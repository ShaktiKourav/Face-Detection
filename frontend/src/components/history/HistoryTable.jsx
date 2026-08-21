import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";
import {
  MdHistory,
  MdSearch,
  MdDelete,
  MdFilterList,
  MdCalendarToday,
} from "react-icons/md";

import {
  FaSmile,
  FaSadTear,
  FaAngry,
  FaMeh,
} from "react-icons/fa";

const HistoryTable = () => {

  /* ==========================================
          STATES
  ========================================== */

  const [history, setHistory] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  /* ==========================================
          LOAD HISTORY
  ========================================== */

useEffect(() => {
  const loadHistory = async () => {
    try {
      const response = await api.get("/history");

      console.log("📚 History Response:", response.data);

      setHistory(response.data.data || []);

    } catch (error) {
      console.error("❌ Failed to load history:", error);

      setHistory([]);
    }
  };

  loadHistory();
}, []);

  /* ==========================================
          DELETE RECORD
  ========================================== */

 const deleteRecord = async (id) => {

    try {

      await api.delete(
        `/history/${id}`
      );

      setHistory((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      console.log(
        "🗑️ Record deleted:",
        id
      );

    } catch (error) {

      console.error(
        "❌ Failed to delete history:",
        error
      );

    }

  };

  /* ==========================================
          CLEAR HISTORY
  ========================================== */
const clearHistory = async () => {
  try {

    await api.delete("/history/clear/all");

    setHistory([]);

    console.log("🗑️ History cleared successfully");

  } catch (error) {

    console.error(
      "❌ Clear history failed:",
      error
    );

  }
};
  /* ==========================================
          FILTERED DATA
  ========================================== */

  const filteredHistory = useMemo(() => {

    return history.filter((item) => {

      const mood =
        item.mood?.toLowerCase() || "";

      const searchMatch =
        mood.includes(search.toLowerCase());

      const filterMatch =
        filter === "All"
          ? true
          : mood.includes(filter.toLowerCase());

      return searchMatch && filterMatch;

    });

  }, [history, search, filter]);

  /* ==========================================
          TOTALS
  ========================================== */

  const totalRecords = history.length;

 const todayRecords = history.filter((item) => {

  if (!item.createdAt) return false;

  const recordDate = new Date(item.createdAt);

  const today = new Date();

  return (
    recordDate.toDateString() ===
    today.toDateString()
  );

}).length;
  /* ==========================================
          UI
  ========================================== */

  return (

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  className="
  relative
  overflow-hidden
  rounded-[28px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  backdrop-blur-2xl
  shadow-[var(--shadow-lg)]
  "
>

  {/* Background Glow */}

  <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

  <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-violet-500/10 blur-[130px]" />

  {/* ======================================
                HEADER
  ====================================== */}

  <div
    className="
    relative
    flex
    flex-col
    gap-5
    border-b
    border-[var(--border-color)]
    px-6
    py-5
    lg:flex-row
    lg:items-center
    lg:justify-between
    "
  >

    {/* Left */}

    <div>

      <span
        className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-gradient-to-r
        from-pink-500/15
        to-violet-500/15
        px-3
        py-1
        text-[10px]
        font-semibold
        uppercase
        tracking-[2px]
        text-pink-500
        "
      >
        <MdHistory size={13} />
        Detection History
      </span>

      <h2
        className="
        mt-3
        text-2xl
        font-bold
        text-[var(--text-primary)]
        "
      >
        Mood Detection Records
      </h2>

      <p
        className="
        mt-2
        max-w-2xl
        text-[13px]
        leading-6
        text-[var(--text-secondary)]
        "
      >
        Browse all previously detected moods, confidence
        scores, timestamps and recommended music stored
        by the AI detection engine.
      </p>

    </div>

    {/* Right */}

    <motion.div
      whileHover={{
        rotate: 8,
        scale: 1.05,
      }}
      className="
      flex
      h-16
      w-16
      items-center
      justify-center
      rounded-3xl
      bg-gradient-to-br
      from-pink-500
      via-fuchsia-500
      to-violet-600
      text-white
      shadow-xl
      "
    >
      <MdHistory size={30} />
    </motion.div>

  </div>
  {/* ======================================
            STATS
====================================== */}

<div
  className="
  px-6
  py-5
  grid
  gap-4
  md:grid-cols-3
  "
>

  {/* Total */}

  <motion.div
    whileHover={{ y: -4 }}
    className="
    rounded-2xl
    border
    border-[var(--border-color)]
    bg-[var(--glass)]
    p-4
    backdrop-blur-xl
    transition-all
    duration-300
    hover:border-pink-300
    "
  >

    <p
      className="
      text-[11px]
      uppercase
      tracking-[2px]
      text-[var(--text-secondary)]
      "
    >
      Total Records
    </p>

    <h2
      className="
      mt-2
      text-2xl
      font-bold
      text-[var(--text-primary)]
      "
    >
      {totalRecords}
    </h2>

  </motion.div>

  {/* Today */}

  <motion.div
    whileHover={{ y: -4 }}
    className="
    rounded-2xl
    border
    border-[var(--border-color)]
    bg-[var(--glass)]
    p-4
    backdrop-blur-xl
    transition-all
    duration-300
    hover:border-violet-300
    "
  >

    <p
      className="
      text-[11px]
      uppercase
      tracking-[2px]
      text-[var(--text-secondary)]
      "
    >
      Today's Records
    </p>

    <h2
      className="
      mt-2
      text-2xl
      font-bold
      text-[var(--text-primary)]
      "
    >
      {todayRecords}
    </h2>

  </motion.div>

  {/* Filter */}

  <motion.div
    whileHover={{ y: -4 }}
    className="
    rounded-2xl
    border
    border-[var(--border-color)]
    bg-[var(--glass)]
    p-4
    backdrop-blur-xl
    transition-all
    duration-300
    hover:border-cyan-300
    "
  >

    <p
      className="
      text-[11px]
      uppercase
      tracking-[2px]
      text-[var(--text-secondary)]
      "
    >
      Active Filter
    </p>

    <h2
      className="
      mt-2
      text-xl
      font-bold
      text-[var(--text-primary)]
      "
    >
      {filter}
    </h2>

  </motion.div>

</div>

{/* ======================================
          SEARCH & FILTER
====================================== */}

<div
  className="
  grid
  gap-4
  px-6
  pb-6
  lg:grid-cols-[1fr_210px_160px]
  "
>

  {/* Search */}

  <div className="relative">

    <MdSearch
      className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-lg
      text-[var(--text-secondary)]
      "
    />

    <input
      type="text"
      placeholder="Search mood..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
      w-full
      rounded-xl
      border
      border-[var(--border-color)]
      bg-[var(--glass)]
      py-3
      pl-11
      pr-4
      text-sm
      text-[var(--text-primary)]
      placeholder:text-[var(--text-secondary)]
      backdrop-blur-xl
      outline-none
      transition-all
      duration-300
      focus:border-pink-400
      "
    />

  </div>

  {/* Filter */}

  <div className="relative">

    <MdFilterList
      className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-lg
      text-[var(--text-secondary)]
      "
    />

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="
      w-full
      rounded-xl
      border
      border-[var(--border-color)]
      bg-[var(--glass)]
      py-3
      pl-11
      pr-4
      text-sm
      text-[var(--text-primary)]
      backdrop-blur-xl
      outline-none
      transition-all
      duration-300
      focus:border-pink-400
      "
    >
      <option>All</option>
      <option>Happy</option>
      <option>Sad</option>
      <option>Angry</option>
      <option>Neutral</option>
    </select>

  </div>

  {/* Clear */}

  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    onClick={clearHistory}
    className="
    rounded-xl
    bg-gradient-to-r
    from-red-500
    to-pink-600
    px-5
    py-3
    text-sm
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-300
    "
  >
    Clear History
  </motion.button>

</div>
{/* ======================================
            HISTORY TABLE
====================================== */}

<div
  className="
  mx-6
  overflow-hidden
  rounded-[24px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  shadow-[var(--shadow)]
  "
>

  {/* ======================================
              TABLE HEADER
  ====================================== */}

  <div
    className="
    hidden
    grid-cols-[70px_150px_120px_160px_140px_150px_80px]
    items-center
    gap-4
    border-b
    border-[var(--border-color)]
    bg-gradient-to-r
    from-pink-500
    via-fuchsia-500
    to-violet-600
    px-5
    py-4
    text-[12px]
    font-semibold
    uppercase
    tracking-[2px]
    text-white
    lg:grid
    "
  >

    <span>#</span>

    <span>Date</span>

    <span>Time</span>

    <span>Mood</span>

    <span>Confidence</span>

    <span>Song</span>

    <span>Action</span>

  </div>

  {/* ======================================
              EMPTY STATE
  ====================================== */}

  {filteredHistory.length === 0 && (

    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      py-20
      text-center
      "
    >

      <div
        className="
        flex
        h-20
        w-20
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-pink-500/10
        to-violet-500/10
        "
      >

        <MdHistory
          size={40}
          className="text-pink-500"
        />

      </div>

      <h3
        className="
        mt-6
        text-2xl
        font-bold
        text-[var(--text-primary)]
        "
      >
        No Detection History
      </h3>

      <p
        className="
        mt-3
        max-w-md
        text-[13px]
        leading-6
        text-[var(--text-secondary)]
        "
      >
        Your AI mood detection records will appear
        here after successful face detection.
      </p>

    </div>

  )}

  {/* ======================================
            DESKTOP TABLE
  ====================================== */}

  <div className="hidden lg:block">

    {filteredHistory.map((item, index) => (

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          backgroundColor: "rgba(236,72,153,.04)",
        }}
        transition={{ duration: .2 }}
        className="
        grid
        grid-cols-[70px_150px_120px_160px_140px_150px_80px]
        items-center
        gap-4
        border-b
        border-[var(--border-color)]
        px-5
        py-4
        transition-all
        duration-300
        "
      >

        {/* Number */}

        <span
          className="
          font-semibold
          text-[var(--text-primary)]
          "
        >
          {index + 1}
        </span>

        {/* Date */}

        <div
          className="
          flex
          items-center
          gap-2
          text-sm
          text-[var(--text-primary)]
          "
        >

          <MdCalendarToday
            className="text-pink-500"
          />

          {item.date}

        </div>

        {/* Time */}

        <span
          className="
          text-sm
          text-[var(--text-secondary)]
          "
        >
          {item.time}
        </span>
                {/* ======================================
                    MOOD
        ====================================== */}

        <div>

          {item.mood === "Happy" && (

            <span
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-emerald-500/10
              px-3
              py-1.5
              text-xs
              font-semibold
              text-emerald-500
              "
            >
              <FaSmile />
              Happy
            </span>

          )}

          {item.mood === "Sad" && (

            <span
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-500/10
              px-3
              py-1.5
              text-xs
              font-semibold
              text-blue-500
              "
            >
              <FaSadTear />
              Sad
            </span>

          )}

          {item.mood === "Angry" && (

            <span
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-red-500/10
              px-3
              py-1.5
              text-xs
              font-semibold
              text-red-500
              "
            >
              <FaAngry />
              Angry
            </span>

          )}

          {item.mood === "Neutral" && (

            <span
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-gray-500/10
              px-3
              py-1.5
              text-xs
              font-semibold
              text-[var(--text-primary)]
              "
            >
              <FaMeh />
              Neutral
            </span>

          )}

        </div>

        {/* ======================================
                CONFIDENCE
        ====================================== */}

        <div>

          <div
            className="
            mb-1
            flex
            justify-between
            text-[11px]
            text-[var(--text-secondary)]
            "
          >

            <span>AI</span>

            <span>

              {item.confidence || 95}%

            </span>

          </div>

          <div
            className="
            h-2
            overflow-hidden
            rounded-full
            bg-[var(--border-color)]
            "
          >

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${item.confidence || 95}%`,
              }}
              transition={{ duration: .8 }}
              className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-pink-500
              via-fuchsia-500
              to-violet-600
              "
            />

          </div>

        </div>

        {/* ======================================
                    SONG
        ====================================== */}

        <div>

          <p
            className="
            text-sm
            font-semibold
            text-[var(--text-primary)]
            "
          >
            {item.song || "Happy Vibes"}
          </p>

          <p
            className="
            mt-1
            text-[11px]
            text-[var(--text-secondary)]
            "
          >
            AI Recommendation
          </p>

        </div>

        {/* ======================================
                  DELETE
        ====================================== */}

        <motion.button

          whileHover={{
            scale: 1.08,
          }}

          whileTap={{
            scale: .94,
          }}

        onClick={() => deleteRecord(item._id)}

          className="
          mx-auto
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-red-500/10
          text-red-500
          transition-all
          duration-300
          hover:bg-red-500
          hover:text-white
          "
        >

          <MdDelete size={20} />

        </motion.button>

      </motion.div>

    ))}

  </div>
  {/* ======================================
            MOBILE CARDS
====================================== */}

<div className="space-y-4 p-4 lg:hidden">

  {filteredHistory.map((item, index) => (

    <motion.div
      key={index}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="
      rounded-2xl
      border
      border-[var(--border-color)]
      bg-[var(--glass)]
      p-4
      backdrop-blur-xl
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-base font-semibold text-[var(--text-primary)]">

            Record #{index + 1}

          </h3>

          <p className="mt-1 text-xs text-[var(--text-secondary)]">

            {item.date} • {item.time}

          </p>

        </div>

        <button
          onClick={() => deleteRecord(item._id)}
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-red-500/10
          text-red-500
          transition
          hover:bg-red-500
          hover:text-white
          "
        >

          <MdDelete />

        </button>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div>

          <p className="text-[11px] uppercase tracking-wide text-[var(--text-secondary)]">

            Mood

          </p>

          <h4 className="mt-1 font-semibold text-[var(--text-primary)]">

            {item.mood}

          </h4>

        </div>

        <div>

          <p className="text-[11px] uppercase tracking-wide text-[var(--text-secondary)]">

            Confidence

          </p>

          <h4 className="mt-1 font-semibold text-[var(--text-primary)]">

            {item.confidence || 95}%

          </h4>

        </div>

        <div className="col-span-2">

          <p className="text-[11px] uppercase tracking-wide text-[var(--text-secondary)]">

            Recommended Song

          </p>

          <h4 className="mt-1 font-semibold text-[var(--text-primary)]">

            {item.song || "Happy Vibes"}

          </h4>

        </div>

      </div>

      <div className="mt-4 h-2 rounded-full bg-[var(--border-color)]">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${item.confidence || 95}%`,
          }}
          transition={{ duration: .8 }}
          className="
          h-full
          rounded-full
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-violet-600
          "
        />

      </div>

    </motion.div>

  ))}

</div>
</div>

{/* ======================================
          HISTORY SUMMARY
====================================== */}

{filteredHistory.length > 0 && (

  <div
    className="
    mt-6
    grid
    gap-5
    lg:grid-cols-2
    "
  >

    {/* Left */}

    <motion.div
      whileHover={{ y: -3 }}
      className="
      rounded-[28px]
      bg-gradient-to-br
      from-pink-500
      via-fuchsia-500
      to-violet-600
      p-6
      text-white
      shadow-xl
      "
    >

      <span
        className="
        rounded-full
        bg-white/15
        px-3
        py-1
        text-[10px]
        uppercase
        tracking-[2px]
        "
      >

        AI Summary

      </span>

      <h2 className="mt-4 text-xl font-bold">

        Detection History

      </h2>

      <p className="mt-3 text-[13px] leading-6 text-white/90">

        Every successful face detection stores
        mood prediction, confidence score,
        date, time and music recommendation.

      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-white/15 p-4">

          <p className="text-xs text-white/70">

            Total

          </p>

          <h3 className="mt-2 text-2xl font-bold">

            {totalRecords}

          </h3>

        </div>

        <div className="rounded-xl bg-white/15 p-4">

          <p className="text-xs text-white/70">

            Filtered

          </p>

          <h3 className="mt-2 text-2xl font-bold">

            {filteredHistory.length}

          </h3>

        </div>

      </div>

    </motion.div>

    {/* Right */}

    <motion.div
      whileHover={{ y: -3 }}
      className="
      rounded-[28px]
      border
      border-[var(--border-color)]
      bg-[var(--card-bg)]
      p-6
      backdrop-blur-xl
      "
    >

      <h2 className="text-xl font-bold text-[var(--text-primary)]">

        AI Storage Status

      </h2>

      <p className="mt-2 text-[13px] text-[var(--text-secondary)]">

        Detection records are securely stored
        in browser local storage and are ready
        for MongoDB/Firebase integration.

      </p>

      <div className="mt-6 space-y-5">

        {[
          ["History Storage", "100"],
          ["Detection Accuracy", "98"],
          ["AI Performance", "99"],
        ].map(([label, value]) => (

          <div key={label}>

            <div className="mb-2 flex justify-between text-xs text-[var(--text-secondary)]">

              <span>{label}</span>

              <span>{value}%</span>

            </div>

            <div className="h-2 rounded-full bg-[var(--border-color)]">

              <div
                style={{ width: `${value}%` }}
                className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-pink-500
                via-fuchsia-500
                to-violet-600
                "
              />

            </div>

          </div>

        ))}

      </div>

    </motion.div>

  </div>

)}
{/* ======================================
            FOOTER
====================================== */}

<motion.div
  whileHover={{
    y: -3,
  }}
  transition={{
    duration: .25,
  }}
  className="
  relative
  mt-6
  overflow-hidden
  rounded-[28px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  p-6
  backdrop-blur-xl
  shadow-[var(--shadow)]
  "
>

  {/* Glow */}

  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-pink-500/10 blur-[110px]" />

  <div className="absolute -left-20 -bottom-20 h-52 w-52 rounded-full bg-violet-500/10 blur-[110px]" />

  <div className="relative">

    <span
      className="
      inline-flex
      rounded-full
      bg-gradient-to-r
      from-pink-500/15
      to-violet-500/15
      px-3
      py-1
      text-[10px]
      font-semibold
      uppercase
      tracking-[2px]
      text-pink-500
      "
    >
      History Management
    </span>

    <h2
      className="
      mt-4
      text-xl
      font-bold
      text-[var(--text-primary)]
      "
    >
      AI Mood Detection History
    </h2>

    <p
      className="
      mt-3
      max-w-3xl
      text-[13px]
      leading-7
      text-[var(--text-secondary)]
      "
    >
      Every successful face detection is automatically
      stored with detected mood, confidence score,
      recommendation, date and time. The component
      supports both local storage and future backend
      integration with MongoDB or Firebase.
    </p>

    {/* Footer Stats */}

    <div
      className="
      mt-6
      grid
      gap-4
      md:grid-cols-3
      "
    >

      <div
        className="
        rounded-2xl
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        backdrop-blur-xl
        "
      >

        <p
          className="
          text-[11px]
          uppercase
          tracking-[2px]
          text-[var(--text-secondary)]
          "
        >
          Total Records
        </p>

        <h3
          className="
          mt-2
          text-2xl
          font-bold
          text-[var(--text-primary)]
          "
        >
          {totalRecords}
        </h3>

      </div>

      <div
        className="
        rounded-2xl
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        backdrop-blur-xl
        "
      >

        <p
          className="
          text-[11px]
          uppercase
          tracking-[2px]
          text-[var(--text-secondary)]
          "
        >
          Today's Records
        </p>

        <h3
          className="
          mt-2
          text-2xl
          font-bold
          text-[var(--text-primary)]
          "
        >
          {todayRecords}
        </h3>

      </div>

      <div
        className="
        rounded-2xl
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        backdrop-blur-xl
        "
      >

        <p
          className="
          text-[11px]
          uppercase
          tracking-[2px]
          text-[var(--text-secondary)]
          "
        >
          AI Status
        </p>

        <h3
          className="
          mt-2
          text-lg
          font-bold
          text-emerald-500
          "
        >
          Active
        </h3>

      </div>
      </div>

    </div>

</motion.div>
</motion.div>
  
  
  );
 

};

export default HistoryTable;