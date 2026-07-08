import { motion } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";

const variants = {
  primary:
    "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white shadow-lg hover:shadow-2xl",

  secondary:
    "bg-violet-100 text-violet-700 hover:bg-violet-200",

  outline:
    "border border-pink-300 bg-white text-pink-600 hover:bg-pink-50",

  success:
    "bg-gradient-to-r from-green-500 to-emerald-600 text-white",

  danger:
    "bg-gradient-to-r from-red-500 to-rose-600 text-white",
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  return (
    <motion.button
      whileHover={{
        y: -2,
        scale: disabled ? 1 : 1.02,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.98,
      }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <>
          <ImSpinner2 className="animate-spin text-lg" />
          Loading...
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;