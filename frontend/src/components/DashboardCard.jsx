import { motion } from "framer-motion";

const DashboardCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "from-pink-500 to-violet-600",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-[0_15px_45px_rgba(168,85,247,.12)] "
    >
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-pink-300/30 to-violet-300/30 blur-3xl transition-all duration-500 group-hover:scale-125"></div>

      <div className="relative flex items-center justify-between p-6">
        {/* Left */}
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-800">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        {/* Icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110`}
        >
          <div className="text-2xl">
            {icon}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${color}`}
      ></div>
    </motion.div>
  );
};

export default DashboardCard;