import { motion } from "framer-motion";
import { MdFaceRetouchingNatural } from "react-icons/md";

const Loader = ({
  fullScreen = false,
  overlay = false,
  text = "Loading...",
  size = "large",
}) => {
  return (
    <div
      className={`
        ${
          fullScreen
            ? "fixed inset-0 z-[9999]"
            : "relative w-full py-12"
        }

        ${
          overlay
            ? "absolute inset-0 z-50"
            : ""
        }

        flex
        items-center
        justify-center

        ${
          fullScreen || overlay
            ? "bg-white/70 dark:bg-black/60 backdrop-blur-xl"
            : ""
        }
      `}
    >
      <motion.div
        initial={{ opacity: 0, scale: .9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .4 }}
        className="flex flex-col items-center"
      >
        {/* Spinner */}

        <div className="relative">

          {/* Outer Ring */}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "linear",
            }}
            className={`
              rounded-full
              border-[6px]
              border-pink-200
              border-t-pink-500
              border-r-violet-600

              ${
                size === "small"
                  ? "h-14 w-14"
                  : "h-24 w-24"
              }
            `}
          />

          {/* Center */}

          <div className="absolute inset-0 flex items-center justify-center">

            <MdFaceRetouchingNatural
              className={`

                text-pink-500

                ${
                  size === "small"
                    ? "text-2xl"
                    : "text-5xl"
                }

              `}
            />

          </div>

        </div>

        {/* Loading Text */}

        <motion.p
          animate={{
            opacity: [.5, 1, .5],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
          }}
          className="mt-6 text-lg font-semibold gradient-text"
        >
          {text}
        </motion.p>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">

          AI MoodSense is preparing your experience...

        </p>

      </motion.div>
    </div>
  );
};

export default Loader;