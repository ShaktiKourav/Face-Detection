import { motion } from "framer-motion";
import {
  MdTrendingUp,
  MdTrendingDown,
} from "react-icons/md";

const StatsCard = ({
  title,
  value,
  icon,
  color = "from-pink-500 via-fuchsia-500 to-violet-600",
  change = "+12%",
  trend = "up",
  description = "Compared to last week",
}) => {


  return (
  <motion.div
    whileHover={{
      y: -6,
      scale: 1.02,
    }}
    transition={{
      duration: 0.3,
      ease: "easeOut",
    }}
    className="
    group
    relative
    overflow-hidden
    rounded-[30px]
    border
    border-[var(--border-color)]
    bg-[var(--card-bg)]
    backdrop-blur-3xl
    shadow-[var(--shadow)]
    transition-all
    duration-500
    hover:border-pink-400/40
    hover:shadow-[0_25px_60px_rgba(236,72,153,.14)]
    min-h-[190px]
    "
  >
    {/* Glow */}

    <div
      className={`
      absolute
      -top-20
      -right-20
      h-52
      w-52
      rounded-full
      bg-gradient-to-br
      ${color}
      opacity-20
      blur-[90px]
      transition-all
      duration-700
      group-hover:scale-125
      `}
    />

    {/* Shine */}

    <div
      className="
      absolute
      inset-0
      -translate-x-full
      bg-gradient-to-r
      from-transparent
      via-white/10
      to-transparent
      transition-transform
      duration-1000
      group-hover:translate-x-full
      "
    />

    {/* Top Border */}

    <div
      className={`
      absolute
      left-0
      top-0
      h-[4px]
      w-full
      bg-gradient-to-r
      ${color}
      `}
    />

    <div className="relative flex h-full flex-col justify-between p-6">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1 min-w-0">

          <p
            className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[2px]
            text-[var(--text-secondary)]
            "
          >
            {title}
          </p>

          <h2
            className="
            mt-3
            break-words
            text-2xl
            xl:text-[30px]
            font-extrabold
            leading-tight
            text-[var(--text-primary)]
            "
          >
            {value}
          </h2>

        </div>

        <motion.div
          whileHover={{
            rotate: 10,
            scale: 1.1,
          }}
          transition={{
            duration: .25,
          }}
          className={`
          relative
          flex
          h-15
          w-15
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          ${color}
          text-white
          shadow-[0_15px_35px_rgba(168,85,247,.25)]
          `}
        >

          <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm" />

          <div className="relative">

            {icon}

          </div>

        </motion.div>

      </div>

      {/* Divider */}

      <div className="my-5 h-px bg-[var(--border-color)]" />

      {/* Footer */}

      <div className="flex items-center justify-between gap-3">

        <div className="flex items-center gap-2">

          {trend === "up" ? (
            <MdTrendingUp
              size={18}
              className="text-emerald-500"
            />
          ) : (
            <MdTrendingDown
              size={18}
              className="text-red-500"
            />
          )}

          <span
            className={`
            rounded-full
            px-3
            py-1
            text-[11px]
            font-semibold
            ${
              trend === "up"
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-red-500/10 text-red-500"
            }
            `}
          >
            {change}
          </span>

        </div>

        <span
          className="
          max-w-[130px]
          text-right
          text-[11px]
          leading-5
          text-[var(--text-secondary)]
          "
        >
          {description}
        </span>

      </div>

    </div>

    {/* Bottom Progress */}

    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
      }}
      className={`
      absolute
      bottom-0
      left-0
      h-[3px]
      bg-gradient-to-r
      ${color}
      `}
    />
  </motion.div>
);

};

export default StatsCard;