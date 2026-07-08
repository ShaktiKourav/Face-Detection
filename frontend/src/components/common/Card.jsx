import { motion } from "framer-motion";

const Card = ({
  title,
  subtitle,
  icon,
  children,
  footer,
  className = "",
  hover = true,
  gradient = false,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : {}}
      transition={{ duration: 0.25 }}
      className={`
        overflow-hidden
        rounded-[30px]
        border
        border-white/70
        bg-white/70
        backdrop-blur-2xl
        shadow-[0_18px_45px_rgba(168,85,247,.10)]
        dark:border-white/10
        dark:bg-[#1d1b2e]/80
        ${className}
      `}
    >
      {/* Header */}

      {(title || icon) && (
        <div
          className={`
            flex
            items-center
            gap-4
            p-6
            ${
              gradient
                ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white"
                : ""
            }
          `}
        >
          {icon && (
            <div
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                ${
                  gradient
                    ? "bg-white/20"
                    : "bg-pink-100 text-pink-600 dark:bg-pink-500/20"
                }
              `}
            >
              {icon}
            </div>
          )}

          <div>

            {title && (
              <h3 className="text-xl font-bold">
                {title}
              </h3>
            )}

            {subtitle && (
              <p
                className={`text-sm ${
                  gradient
                    ? "text-white/90"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {subtitle}
              </p>
            )}

          </div>
        </div>
      )}

      {/* Body */}

      <div className="p-6">

        {children}

      </div>

      {/* Footer */}

      {footer && (
        <div className="border-t border-gray-100 p-5 dark:border-white/10">

          {footer}

        </div>
      )}
    </motion.div>
  );
};

export default Card;