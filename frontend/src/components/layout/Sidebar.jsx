

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import {
  FiHome,
  FiCamera,
  FiMusic,
  FiClock,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiChevronLeft,
} from "react-icons/fi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  /* ==========================================================
     MENU ITEMS
  ========================================================== */

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome size={20} />,
    },
    {
      title: "Face Detection",
      path: "/detection",
      icon: <FiCamera size={20} />,
    },
    {
      title: "Music",
      path: "/music",
      icon: <FiMusic size={20} />,
    },
    {
      title: "History",
      path: "/history",
      icon: <FiClock size={20} />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FiSettings size={20} />,
    },
  ];

  /* ==========================================================
     USER INFORMATION
  ========================================================== */

  const userName =
    user?.name ||
    user?.displayName ||
    user?.username ||
    "User";

  const userEmail =
    user?.email || "MoodSense User";

  const userInitials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /* ==========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      /*
       * Inform backend that user is logging out.
       *
       * JWT/local authentication will still be cleared
       * even if this request fails.
       */
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "Backend logout error:",
        error.response?.data || error.message
      );
    } finally {
      /*
       * Clear Firebase + React state + localStorage
       */
      await logout();

      /*
       * Close mobile sidebar
       */
      setSidebarOpen(false);

      /*
       * Redirect to login/home
       */
      navigate("/", {
        replace: true,
      });

      setLoggingOut(false);
    }
  };

  /* ==========================================================
     SIDEBAR
  ========================================================== */

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        flex-col
        border-r
        border-[var(--border-color)]
        bg-[var(--sidebar-bg)]
        backdrop-blur-3xl
        shadow-[0_20px_60px_rgba(0,0,0,.12)]
        transition-all
        duration-300

        ${collapsed ? "w-20" : "w-64"}

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      <div className="flex h-full flex-col px-4 py-5">

        {/* ======================================================
            LOGO
        ====================================================== */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-pink-500
                via-fuchsia-500
                to-violet-600
                text-base
                font-bold
                text-white
                shadow-lg
              "
            >
              AI
            </div>

            {!collapsed && (
              <div>
                <h2 className="text-[17px] font-bold text-[var(--text-primary)]">
                  MoodSense
                </h2>

                <p className="mt-0.5 text-[12px] text-[var(--text-secondary)]">
                  Face Detection AI
                </p>
              </div>
            )}

          </div>

          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              text-[var(--text-primary)]
              transition-all
              duration-300
              hover:border-pink-400
              hover:bg-gradient-to-r
              hover:from-pink-500
              hover:to-violet-600
              hover:text-white
            "
          >
            {collapsed ? (
              <FiMenu size={18} />
            ) : (
              <FiChevronLeft size={18} />
            )}
          </button>

        </div>

        {/* ======================================================
            MENU
        ====================================================== */}

        <nav className="flex-1 space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                group
                flex
                items-center
                gap-3
                rounded-2xl
                px-3
                py-3
                transition-all
                duration-300

                ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white shadow-lg shadow-pink-500/20"
                    : "text-[var(--text-primary)] hover:bg-[var(--hover)]"
                }
              `}
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/5
                  transition-all
                  duration-300
                  group-hover:scale-110
                "
              >
                {item.icon}
              </div>

              {!collapsed && (
                <span className="text-[14px] font-medium">
                  {item.title}
                </span>
              )}
            </NavLink>
          ))}

        </nav>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <div className="mt-6 border-t border-[var(--border-color)] pt-5">

          {/* ====================================================
              USER CARD
          ==================================================== */}

          {!collapsed && (
            <div
              className="
                mb-4
                rounded-2xl
                border
                border-[var(--border-color)]
                bg-[var(--glass)]
                p-4
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-pink-500
                    via-fuchsia-500
                    to-violet-600
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {userInitials}
                </div>

                <div className="min-w-0 flex-1">

                  <h4
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    {userName}
                  </h4>

                  <p
                    className="
                      truncate
                      text-[11px]
                      text-[var(--text-secondary)]
                    "
                  >
                    {userEmail}
                  </p>

                </div>

              </div>
            </div>
          )}

          {/* ====================================================
              LOGOUT
          ==================================================== */}

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className={`
              group
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              px-3
              py-3
              text-red-500
              transition-all
              duration-300
              hover:bg-red-500
              hover:text-white
              ${
                loggingOut
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }
            `}
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                transition-all
                duration-300
                group-hover:bg-white/20
              "
            >
              <FiLogOut size={20} />
            </div>

            {!collapsed && (
              <div className="text-left">

                <p className="text-sm font-semibold">
                  {loggingOut ? "Logging out..." : "Logout"}
                </p>

                <p className="text-[11px] opacity-80">
                  {loggingOut
                    ? "Please wait..."
                    : "Sign out of your account"}
                </p>

              </div>
            )}

          </button>

        </div>

      </div>
    </aside>
  );
};

export default Sidebar;