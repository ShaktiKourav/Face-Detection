import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdErrorOutline,
  MdHome,
  MdArrowBack,
} from "react-icons/md";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-10 text-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)]"
      >
        {/* Background Glow */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"></div>

        <div className="relative">

          {/* Icon */}
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 shadow-xl">
            <MdErrorOutline
              className="text-white"
              size={60}
            />
          </div>

          {/* 404 */}
          <h1 className="mt-8 text-8xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-bold">
            Page Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/home"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <MdHome size={22} />
              Go Home
            </Link>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-2xl border border-violet-200 px-8 py-4 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              <MdArrowBack size={22} />
              Go Back
            </button>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;