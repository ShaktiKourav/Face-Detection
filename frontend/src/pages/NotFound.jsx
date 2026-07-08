import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdHome, MdArrowBack } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="flex min-h-[85vh] items-center justify-center px-5">

      <motion.div
        initial={{ opacity: 0, scale: .9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .5 }}
        className="glass w-full max-w-3xl rounded-[36px] p-10 text-center"
      >
        {/* 404 */}

        <motion.h1
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 bg-clip-text text-8xl font-extrabold text-transparent md:text-9xl"
        >
          404
        </motion.h1>

        {/* Title */}

        <h2 className="mt-6 text-3xl font-bold">
          Oops! Page Not Found
        </h2>

        {/* Description */}

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
          The page you are looking for doesn't exist or has been moved.
          Please return to the dashboard or go back to the previous page.
        </p>

        {/* Illustration */}

        <motion.div
          animate={{
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="mx-auto mt-10 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 text-7xl text-white shadow-[0_20px_60px_rgba(168,85,247,.25)]"
        >
          😵
        </motion.div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1"
          >
            <MdHome size={22} />
            Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-8 py-4 font-semibold text-violet-700 transition duration-300 hover:bg-violet-50"
          >
            <MdArrowBack size={22} />
            Go Back
          </button>

        </div>

        {/* Bottom */}

        <div className="mt-12 rounded-3xl bg-gradient-to-r from-pink-50 to-violet-50 p-6">

          <h3 className="text-lg font-bold">
            AI MoodSense
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Continue exploring Face Detection, Mood Analysis,
            Music Recommendation and History Dashboard.
          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default NotFound;