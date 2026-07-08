import { motion } from "framer-motion";
import { MdMusicNote } from "react-icons/md";

const SongCard = ({
  song,
  active,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`group cursor-pointer overflow-hidden rounded-[26px] border transition-all duration-300

      ${
        active
          ? "border-pink-300 bg-gradient-to-br from-pink-50 to-violet-50 shadow-[0_18px_45px_rgba(236,72,153,.18)]"
          : "border-[var(--border-color)] bg-white hover:border-pink-200 hover:shadow-lg"
      }
      `}
    >
      {/* ======================================
                CARD BODY
      ====================================== */}

      <div className="flex items-center gap-4 p-4">

        {/* COVER */}

        <div className="relative">

          <img
            src={song.image}
            alt={song.title}
            className="h-20 w-20 rounded-2xl object-cover"
          />

          {active && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/35 backdrop-blur-[2px]">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg">

                <MdMusicNote size={20} />

              </div>

            </div>
          )}

        </div>

        {/* DETAILS */}

        <div className="flex-1">

          <div className="flex items-start justify-between gap-3">

            <div>

              <h3 className="line-clamp-1 text-base font-bold text-[var(--text-primary)]">

                {song.title}

              </h3>

              <p className="mt-1 text-xs text-[var(--text-secondary)]">

                {song.artist}

              </p>

            </div>

            <span className="rounded-full bg-pink-100 px-3 py-1 text-[11px] font-semibold text-pink-600">

              {song.duration}

            </span>

          </div>

          {/* TAGS */}

          <div className="mt-4 flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 py-1 text-[11px] font-semibold text-white">

              {song.mood}

            </span>

            {active && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-600">

                Now Playing

              </span>
            )}

          </div>

        </div>

      </div>

      {/* ======================================
              ACTIVE BAR
      ====================================== */}

      {active && (

        <motion.div
          layoutId="active-song"
          className="h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600"
        />

      )}

    </motion.div>
  );
};

export default SongCard;