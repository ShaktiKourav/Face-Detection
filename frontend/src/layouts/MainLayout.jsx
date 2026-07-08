import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

import { useTheme } from "../context/ThemeContext";

const MainLayout = () => {
  const { theme, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[var(--bg-color)]
      text-[var(--text-primary)]
      transition-colors
      duration-300
    "
    >
      {/* ===========================================
                BACKGROUND
      =========================================== */}

      <div className="fixed inset-0 -z-20 overflow-hidden">

        <div className="gradient gradient--one" />

        <div className="gradient gradient--two" />

        <div className="noise" />

      </div>

      {/* ===========================================
                MOBILE OVERLAY
      =========================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-sm
          lg:hidden
        "
        />
      )}

      {/* ===========================================
                SIDEBAR
      =========================================== */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* ===========================================
                MAIN WRAPPER
      =========================================== */}

      <div
        className={`
        relative
        min-h-screen
        flex
        flex-col
        transition-all
        duration-300

        ${
          collapsed
            ? "lg:ml-24"
            : "lg:ml-72"
        }
      `}
      >
        {/* ===========================================
                    NAVBAR
        =========================================== */}

        <header
          className="
          sticky
          top-0
          z-30
          backdrop-blur-xl
        "
        >
          <Navbar
            toggleSidebar={() =>
              setSidebarOpen(!sidebarOpen)
            }
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </header>

        {/* ===========================================
                    PAGE CONTENT
        =========================================== */}

        <main
          className="
          flex-1

          px-4
          py-5

          sm:px-5

          lg:px-7

          xl:px-8

          2xl:px-10
        "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
            mx-auto
            w-full
            max-w-[1800px]
            space-y-6
          "
          >
            <Outlet />
          </motion.div>
        </main>

        {/* ===========================================
                    FOOTER
        =========================================== */}

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;