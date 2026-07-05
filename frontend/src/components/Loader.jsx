import { motion } from "framer-motion";
import { MdFaceRetouchingNatural } from "react-icons/md";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 px-12 py-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.15)]"
      >
        {/* Background Glow */}
        <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-pink-300/30 blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-violet-300/30 blur-3xl"></div>

        <div className="relative flex flex-col items-center">
          {/* Animated Logo */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "linear",
            }}
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 shadow-xl"
          >
            <MdFaceRetouchingNatural
              size={40}
              className="text-white"
            />
          </motion.div>

          {/* Spinner */}
          <div className="relative mb-6 h-14 w-14">
            <div className="absolute inset-0 rounded-full border-[5px] border-pink-100"></div>

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-pink-500 border-r-violet-600"
            />
          </div>

          {/* Text */}
          <h2 className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
            Face Detection System
          </h2>

          <p className="mt-2 text-gray-500">{text}</p>

          {/* Animated Dots */}
          <div className="mt-5 flex gap-2">
            {[0, 1, 2].map((item) => (
              <motion.span
                key={item}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: item * 0.15,
                }}
                className="h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;