import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiMenu,
  FiSearch,
  FiMoon,
  FiSun,
  FiBell,
  FiMusic,
  FiClock,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

const Navbar = ({
  toggleSidebar,
  theme,
  toggleTheme,
}) => {

  const navigate = useNavigate();

  const location = useLocation();

  const dropdownRef = useRef(null);

  /* ==========================================
                STATES
  ========================================== */

  const [time, setTime] = useState(new Date());

  const [search, setSearch] = useState("");

  const [dropdown, setDropdown] = useState(false);

  /* ==========================================
                USER
  ========================================== */

  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Shakti Kourav",
      email: "admin@aimoodsense.com",
    };

  const initials = user.name
    ?.split(" ")
    .map((item) => item[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  /* ==========================================
              PAGE TITLE
  ========================================== */

  const getTitle = () => {

    switch (location.pathname) {

      case "/dashboard":
        return "Dashboard";

      case "/detection":
        return "Face Detection";

      case "/history":
        return "History";

      case "/music":
        return "Music";

      case "/settings":
        return "Setting";

      default:
        return "AI MoodSense";

    }

  };

  /* ==========================================
                LIVE CLOCK
  ========================================== */

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  /* ==========================================
            CLOSE DROPDOWN
  ========================================== */

  useEffect(() => {

    const handleOutsideClick = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {

        setDropdown(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

  }, []);

  /* ==========================================
                LOGOUT
  ========================================== */

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("isLoggedIn");

    navigate("/login");

  };

  /* ==========================================
                  JSX
  ========================================== */

  return (

    <header
      className="
      sticky
      top-0
      z-50
      mb-6
      flex
      h-[68px]
      items-center
      justify-between
      rounded-[22px]
      border
      border-[var(--border-color)]
      bg-[var(--glass)]
      px-6
      backdrop-blur-2xl
      shadow-[var(--shadow)]
      transition-all
      duration-300
    "
    >

      {/* ================= LEFT ================= */}

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--card-bg)]
          text-[var(--text-primary)]
          transition-all
          duration-300
          hover:scale-105
          hover:border-pink-400
          hover:bg-gradient-to-r
          hover:from-pink-500
          hover:to-violet-600
          hover:text-white
        "
        >
          <FiMenu size={18} />
        </button>

        <div className="hidden md:block">

          <h2 className="text-lg font-semibold text-[var(--text-primary)]">

            {getTitle()}

          </h2>

          <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">

           {user.name}

          </p>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="mx-8 hidden max-w-lg flex-1 lg:flex">

        <div
          className="
          flex
          h-11
          w-full
          items-center
          gap-3
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--card-bg)]
          px-4
          transition-all
          duration-300
          focus-within:border-pink-500
          focus-within:ring-2
          focus-within:ring-pink-500/20
        "
        >

          <FiSearch
            size={17}
            className="text-[var(--text-secondary)]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pages..."
            className="
            w-full
            bg-transparent
            text-sm
            text-[var(--text-primary)]
            placeholder:text-[var(--text-secondary)]
            outline-none
          "
          />

        </div>

      </div>
            {/* ================= RIGHT ================= */}

      <div className="flex items-center gap-2">

        {/* ================= MUSIC ================= */}

        <Link
          to="/music"
          className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          transition-all
          duration-300
          hover:scale-105
          ${
            location.pathname === "/music"
              ? "border-pink-500 bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/25"
              : "border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-pink-400 hover:text-pink-500"
          }
        `}
        >
          <FiMusic size={18} />
        </Link>

        {/* ================= HISTORY ================= */}

        <Link
          to="/history"
          className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          transition-all
          duration-300
          hover:scale-105
          ${
            location.pathname === "/history"
              ? "border-pink-500 bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/25"
              : "border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-pink-400 hover:text-pink-500"
          }
        `}
        >
          <FiClock size={18} />
        </Link>

        {/* ================= NOTIFICATION ================= */}

        <button
          className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--card-bg)]
          text-[var(--text-primary)]
          transition-all
          duration-300
          hover:scale-105
          hover:border-pink-400
          hover:text-pink-500
        "
        >
          <FiBell size={18} />

          <span
            className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-[10px]
            font-semibold
            text-white
          "
          >
            3
          </span>

        </button>

        {/* ================= THEME ================= */}

        <button
          onClick={toggleTheme}
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--card-bg)]
          text-[var(--text-primary)]
          transition-all
          duration-300
          hover:scale-105
          hover:border-pink-400
          hover:bg-gradient-to-r
          hover:from-pink-500
          hover:to-violet-600
          hover:text-white
        "
        >
          {theme === "dark"
            ? <FiSun size={18} />
            : <FiMoon size={18} />}
        </button>

        {/* ================= CLOCK ================= */}

        <div
          className="
          hidden
          xl:flex
          items-center
          gap-2
          rounded-2xl
          border
          border-[var(--border-color)]
          bg-[var(--card-bg)]
          px-4
          py-2.5
        "
        >

          <FiClock
            size={15}
            className="text-pink-500"
          />

          <span
            className="
            text-xs
            font-medium
            text-[var(--text-primary)]
          "
          >
            {time.toLocaleTimeString()}
          </span>

        </div>

        {/* ================= PROFILE ================= */}

        <div
          ref={dropdownRef}
          className="relative"
        >

          <button
            onClick={() => setDropdown(!dropdown)}
            className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            px-2
            py-1.5
            transition-all
            duration-300
            hover:border-pink-400
          "
          >

            {/* Avatar */}

            <div
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-pink-500
              to-violet-600
              text-sm
              font-semibold
              text-white
            "
            >
              {initials}
            </div>

            {/* Name */}

            <div className="hidden lg:block text-left">

              <p className="max-w-[130px] truncate text-sm font-semibold text-[var(--text-primary)]">

                {user.name}

              </p>

              <div className="mt-1 flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-[11px] text-green-500">

                  Online

                </span>

              </div>

            </div>

            <FiChevronDown
              size={15}
              className="hidden lg:block text-[var(--text-secondary)]"
            />

          </button>
                    {/* ================= DROPDOWN ================= */}

          <AnimatePresence>

            {dropdown && (

              <motion.div

                initial={{ opacity: 0, y: 12, scale: 0.98 }}

                animate={{ opacity: 1, y: 0, scale: 1 }}

                exit={{ opacity: 0, y: 12, scale: 0.98 }}

                transition={{ duration: 0.2 }}

                className="
                absolute
                right-0
                top-16
                w-72
                overflow-hidden
                rounded-3xl
                border
                border-[var(--border-color)]
                bg-[var(--card-bg)]
                shadow-2xl
                backdrop-blur-2xl
                "
              >

                {/* ================= USER INFO ================= */}

                <div className="border-b border-[var(--border-color)] bg-[var(--glass)] p-5">

                  <div className="flex items-center gap-4">

                    <div
                      className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-r
                      from-pink-500
                      to-violet-600
                      text-base
                      font-semibold
                      text-white
                      "
                    >
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">

                        {user.name}

                      </h3>

                      <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">

                        {user.email}

                      </p>

                      <div className="mt-2 flex items-center gap-2">

                        <div className="h-2 w-2 rounded-full bg-green-500" />

                        <span className="text-[11px] font-medium text-green-500">

                          Online

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                {/* ================= SETTINGS ================= */}

                <Link
                  to="/settings"
                  onClick={() => setDropdown(false)}
                  className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3.5
                  text-sm
                  font-medium
                  text-[var(--text-primary)]
                  transition-all
                  duration-300
                  hover:bg-[var(--hover)]
                  "
                >

                  <FiSettings size={18} />

                  <span>

                    Settings

                  </span>

                </Link>

                {/* ================= LOGOUT ================= */}

                <button
                  onClick={handleLogout}
                  className="
                  flex
                  w-full
                  items-center
                  gap-3
                  border-t
                  border-[var(--border-color)]
                  px-5
                  py-3.5
                  text-left
                  text-sm
                  font-medium
                  text-red-500
                  transition-all
                  duration-300
                  hover:bg-red-500
                  hover:text-white
                  "
                >

                  <FiLogOut size={18} />

                  Logout

                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

    </header>

  );

};

export default Navbar;