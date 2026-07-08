import { motion } from "framer-motion";

const PageWrapper = ({ children, title, subtitle }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      {/* Page Heading (Optional) */}
      {(title || subtitle) && (
        <div className="glass mb-6 rounded-[28px] p-6">
          {title && (
            <h1 className="text-3xl font-bold">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Page Content */}
      <div className="space-y-8">
        {children}
      </div>
    </motion.main>
  );
};

export default PageWrapper;