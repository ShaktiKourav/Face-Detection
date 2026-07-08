import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useTheme } from "../context/ThemeContext";

const DashboardLayout = () => {
  const location = useLocation();

  const { theme, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ==========================================
        CLOSE SIDEBAR
  ========================================== */

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div
      className="
      min-h-screen
      bg-[var(--bg-color)]
      text-[var(--text-primary)]
      transition-all
      duration-300
    "
    >
      {/* ==========================================
                BACKGROUND
      ========================================== */}

      <div className="fixed inset-0 -z-20 overflow-hidden">

        <div
          className="
          absolute
          -left-44
          -top-44
          h-[420px]
          w-[420px]
          rounded-full
          bg-pink-500/15
          blur-[120px]
        "
        />

        <div
          className="
          absolute
          right-[-180px]
          top-32
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-500/15
          blur-[150px]
        "
        />

        <div
          className="
          absolute
          bottom-[-180px]
          left-1/2
          h-[400px]
          w-[400px]
          -translate-x-1/2
          rounded-full
          bg-fuchsia-500/10
          blur-[140px]
        "
        />

      </div>

      {/* ==========================================
              MOBILE OVERLAY
      ========================================== */}

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

      {/* ==========================================
                  SIDEBAR
      ========================================== */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ==========================================
                 MAIN AREA
      ========================================== */}

      <div
        className="
        transition-all
        duration-300

        lg:ml-64
      "
      >
        {/* ==========================================
                    NAVBAR
        ========================================== */}

        <div
          className="
          sticky
          top-0
          z-30
        "
        >
          <Navbar
            toggleSidebar={() =>
              setSidebarOpen(!sidebarOpen)
            }
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>

        {/* ==========================================
                    PAGE
        ========================================== */}

        <main
          className="
          p-4

          sm:p-5

          lg:p-6

          xl:p-7
        "
        >
          <div
            className="
            mx-auto
            w-full
            max-w-[1700px]
            animate-fadeIn
          "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;