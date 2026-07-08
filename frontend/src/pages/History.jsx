import { motion } from "framer-motion";
import HistoryTable from "../components/history/HistoryTable";

import {
  MdHistory,
  MdSecurity,
  MdOutlineAutoGraph,
} from "react-icons/md";

const History = () => {
  return (
    <div className="space-y-8">

      {/* ==========================================
                PAGE HEADER
      ========================================== */}

      <motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: .45 }}
  className="
  relative
  overflow-hidden
  rounded-[30px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  p-6
  shadow-[var(--shadow)]
  "
>

  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />
  <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

  <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div className="max-w-2xl">

      <span
        className="
        inline-flex
        rounded-full
        bg-gradient-to-r
        from-pink-500/15
        to-violet-500/15
        px-3
        py-1
        text-[11px]
        font-semibold
        uppercase
        tracking-[2px]
        text-pink-500
        "
      >
        Detection Records
      </span>

      <h1 className="mt-4 text-3xl font-bold text-[var(--text-primary)]">

        AI Detection

        

      </h1>

      <p className="mt-2 max-w-xl text-[14px] text-sm leading-6 text-[var(--text-secondary)]">

        Review every face detection with mood prediction,
        confidence score, AI recommendation and timeline.

      </p>

    </div>

    <div className="flex gap-4">

      <div
        className="
        rounded-2xl
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-4
        text-center
        backdrop-blur-xl
        "
      >

        <MdHistory
          size={28}
          className="mx-auto text-pink-500"
        />

        <h4 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">

          Records

        </h4>

        <p className="text-xs text-[var(--text-secondary)]">

          AI Saved

        </p>

      </div>

      <div
        className="
        rounded-2xl
        bg-gradient-to-br
        from-pink-500
        via-fuchsia-500
        to-violet-600
        p-4
        text-center
        text-white
        shadow-xl
        "
      >

        <MdSecurity
          size={28}
          className="mx-auto"
        />

        <h4 className="mt-2 text-sm font-semibold">

          Secure

        </h4>

        <p className="text-xs text-white/80">

          Protected

        </p>

      </div>

    </div>

  </div>

</motion.section>
      {/* ==========================================
                QUICK INFO
      ========================================== */}

      <section className="grid gap-6 md:grid-cols-3">

        <motion.div
          whileHover={{ y: -5 }}
          className="glass rounded-[28px] p-6"
        >

          <MdHistory
            size={36}
            className="text-pink-500"
          />

          <h3 className="mt-4 text-xl font-bold">

            Detection Records

          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">

            Every successful face detection is saved
            automatically with mood prediction details.

          </p>

        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="glass rounded-[28px] p-6"
        >

          <MdOutlineAutoGraph
            size={36}
            className="text-violet-600"
          />

          <h3 className="mt-4 text-xl font-bold">

            AI Analytics

          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">

            Review confidence scores, mood trends,
            recommendations and detection statistics.

          </p>

        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="glass rounded-[28px] p-6"
        >

          <MdSecurity
            size={36}
            className="text-cyan-600"
          />

          <h3 className="mt-4 text-xl font-bold">

            Secure Storage

          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">

            History is securely stored and ready for
            MongoDB or Firebase synchronization.

          </p>

        </motion.div>

      </section>

      {/* ==========================================
                HISTORY TABLE
      ========================================== */}

      <HistoryTable />

      {/* ==========================================
                INFORMATION
      ========================================== */}

      <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: .2 }}
  className="
  rounded-[30px]
  border
  border-[var(--border-color)]
  bg-[var(--card-bg)]
  p-6
  shadow-[var(--shadow)]
  "
>

  <h2 className="text-2xl font-bold text-[var(--text-primary)]">

    How History Works

  </h2>

  <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">

    Every successful AI detection stores mood, confidence,
    recommendation, date and time. These records help analyse
    emotional trends and provide personalized music suggestions.

  </p>

  <div className="mt-6 grid gap-4 md:grid-cols-3">

    {[
      {
        title: "Mood Tracking",
        desc: "Monitor emotional changes over time.",
      },
      {
        title: "AI Accuracy",
        desc: "Review confidence and prediction quality.",
      },
      {
        title: "Smart Music",
        desc: "Play songs based on detected mood.",
      },
    ].map((item) => (

      <motion.div
        key={item.title}
        whileHover={{ y: -3 }}
        className="
        rounded-2xl
        border
        border-[var(--border-color)]
        bg-[var(--glass)]
        p-5
        backdrop-blur-xl
        "
      >

        <h3 className="text-lg font-semibold text-[var(--text-primary)]">

          {item.title}

        </h3>

        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">

          {item.desc}

        </p>

      </motion.div>

    ))}

  </div>

</motion.section>

    </div>
  );
};

export default History;