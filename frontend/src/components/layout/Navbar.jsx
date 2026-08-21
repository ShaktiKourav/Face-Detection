

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

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

  const location = useLocation();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();


  /* ==========================================================
     STATES
  ========================================================== */

  const [time, setTime] = useState(new Date());

  const [search, setSearch] = useState("");

  const [dropdown, setDropdown] = useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);


  /* ==========================================================
     USER
  ========================================================== */

  const currentUser = user || {
    name: "User",
    email: "",
  };


  const initials = currentUser.name
    ?.split(" ")
    .map((item) => item[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();


  /* ==========================================================
     SEARCH PAGES
  ========================================================== */

  const pages = [
    {
      name: "Dashboard",
      path: "/dashboard",
      keywords: "dashboard home overview analytics",
    },

    {
      name: "Detection",
      path: "/detection",
      keywords: "detection face mood ai camera",
    },

    {
      name: "History",
      path: "/history",
      keywords: "history records detection history",
    },

    {
      name: "Music",
      path: "/music",
      keywords: "music songs playlist recommendation",
    },

    {
      name: "Profile",
      path: "/profile",
      keywords: "profile account user",
    },

    {
      name: "Settings",
      path: "/settings",
      keywords: "settings preferences configuration",
    },
  ];


  const filteredPages = useMemo(() => {

    if (!search.trim()) {
      return [];
    }

    const query = search
      .toLowerCase()
      .trim();

    return pages.filter((page) =>
      `${page.name} ${page.keywords}`
        .toLowerCase()
        .includes(query)
    );

  }, [search]);


  /* ==========================================================
     PAGE TITLE
  ========================================================== */

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
        return "Settings";

      case "/profile":
        return "Profile";

      default:
        return "AI MoodSense";
    }
  };


  /* ==========================================================
     LIVE CLOCK
  ========================================================== */

  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };

  }, []);


  /* ==========================================================
     CLOSE PROFILE DROPDOWN
  ========================================================== */

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


    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

    };

  }, []);


  /* ==========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = async () => {

    try {

      /* ======================================================
         ADD LOGOUT NOTIFICATION
      ====================================================== */

      const saved =
        localStorage.getItem("notifications");

      let existing = [];

      try {

        existing = saved
          ? JSON.parse(saved)
          : [];

      } catch {

        existing = [];
      }


      if (!Array.isArray(existing)) {
        existing = [];
      }


      const logoutNotification = {

        id: Date.now(),

        title: "Logout",

        message:
          "You have successfully logged out.",

        type: "logout",

        read: false,

        time:
          new Date().toLocaleString(),

        createdAt:
          new Date().toISOString(),
      };


      localStorage.setItem(
        "notifications",
        JSON.stringify([
          logoutNotification,
          ...existing,
        ])
      );


      /* ======================================================
         BACKEND LOGOUT
      ====================================================== */

      await api.post("/auth/logout");


    } catch (error) {

      console.error(
        "Backend logout error:",
        error.response?.data ||
        error.message
      );


    } finally {

      /* ======================================================
         AUTH CONTEXT LOGOUT
      ====================================================== */

      await logout();


      setDropdown(false);

      setShowNotifications(false);


      /* ======================================================
         REDIRECT
      ====================================================== */

      navigate("/", {
        replace: true,
      });

    }
  };


  /* ==========================================================
     NOTIFICATIONS
  ========================================================== */

  const [notifications, setNotifications] = useState(() => {

    try {

      const saved =
        localStorage.getItem("notifications");

      if (!saved) {
        return [];
      }


      const parsed = JSON.parse(saved);


      if (Array.isArray(parsed)) {
        return parsed;
      }


      localStorage.removeItem(
        "notifications"
      );

      return [];

    } catch (error) {

      console.error(
        "Invalid notifications data:",
        error
      );

      localStorage.removeItem(
        "notifications"
      );

      return [];
    }
  });


  /* ==========================================================
     LISTEN FOR NOTIFICATION UPDATES
  ========================================================== */

  useEffect(() => {

    const handleNotification = () => {

      try {

        const saved =
          localStorage.getItem(
            "notifications"
          );


        if (!saved) {

          setNotifications([]);

          return;
        }


        const parsed =
          JSON.parse(saved);


        if (Array.isArray(parsed)) {

          setNotifications(parsed);

        } else {

          setNotifications([]);

          localStorage.removeItem(
            "notifications"
          );
        }

      } catch (error) {

        console.error(
          "Failed to load notifications:",
          error
        );

        setNotifications([]);
      }
    };


    window.addEventListener(
      "notificationUpdated",
      handleNotification
    );


    return () => {

      window.removeEventListener(
        "notificationUpdated",
        handleNotification
      );

    };

  }, []);


  /* ==========================================================
     UNREAD COUNT
  ========================================================== */

  const unreadNotifications =
    Array.isArray(notifications)
      ? notifications.filter(
          (item) => !item.read
        ).length
      : 0;


  /* ==========================================================
     MARK ALL READ
  ========================================================== */

  const markAllRead = () => {

    const updated =
      notifications.map((item) => ({
        ...item,
        read: true,
      }));


    setNotifications(updated);


    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

  };


  /* ==========================================================
     CLEAR NOTIFICATIONS
  ========================================================== */

  const clearNotifications = () => {

    setNotifications([]);

    localStorage.removeItem(
      "notifications"
    );

  };


  /* ==========================================================
     JSX
  ========================================================== */

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

      {/* ======================================================
          LEFT
      ====================================================== */}

      <div className="flex items-center gap-4">

        {/* SIDEBAR BUTTON */}

        <button
          type="button"
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


        {/* PAGE TITLE */}

        <div className="hidden md:block">

          <h2
            className="
              text-lg
              font-semibold
              text-[var(--text-primary)]
            "
          >
            {getTitle()}
          </h2>


          <p
            className="
              mt-0.5
              text-[13px]
              text-[var(--text-secondary)]
            "
          >
            Welcome, {currentUser.name}
          </p>

        </div>

      </div>


      {/* ======================================================
          SEARCH
      ====================================================== */}

      <div
        className="
          relative
          mx-8
          hidden
          max-w-lg
          flex-1
          lg:flex
        "
      >

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
            className="
              text-[var(--text-secondary)]
            "
          />


          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
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


        {/* SEARCH RESULTS */}

        {search.trim() && (

          <div
            className="
              absolute
              left-0
              right-0
              top-14
              z-[999]
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              shadow-2xl
              backdrop-blur-xl
            "
          >

            {filteredPages.length > 0 ? (

              <div className="p-2">

                {filteredPages.map((page) => (

                  <button
                    key={page.path}
                    type="button"
                    onClick={() => {

                      navigate(page.path);

                      setSearch("");

                    }}
                    className="
                      flex
                      w-full
                      items-center
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      transition-all
                      duration-200
                      hover:bg-pink-500/10
                    "
                  >

                    <div>

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        {page.name}
                      </p>


                      <p
                        className="
                          mt-1
                          text-xs
                          text-[var(--text-secondary)]
                        "
                      >
                        Go to {page.name}
                      </p>

                    </div>

                  </button>

                ))}

              </div>

            ) : (

              <div className="px-5 py-6 text-center">

                <p
                  className="
                    text-sm
                    font-semibold
                    text-[var(--text-primary)]
                  "
                >
                  No page found
                </p>


                <p
                  className="
                    mt-1
                    text-xs
                    text-[var(--text-secondary)]
                  "
                >
                  Try Dashboard, Detection,
                  History or Music
                </p>

              </div>

            )}

          </div>

        )}

      </div>


      {/* ======================================================
          RIGHT
      ====================================================== */}

      <div className="flex items-center gap-2">


        {/* MUSIC */}

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
                ? `
                  border-pink-500
                  bg-gradient-to-r
                  from-pink-500
                  to-violet-600
                  text-white
                  shadow-lg
                  shadow-pink-500/25
                `
                : `
                  border-[var(--border-color)]
                  bg-[var(--card-bg)]
                  text-[var(--text-primary)]
                  hover:border-pink-400
                  hover:text-pink-500
                `
            }
          `}
        >

          <FiMusic size={18} />

        </Link>


        {/* HISTORY */}

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
                ? `
                  border-pink-500
                  bg-gradient-to-r
                  from-pink-500
                  to-violet-600
                  text-white
                  shadow-lg
                  shadow-pink-500/25
                `
                : `
                  border-[var(--border-color)]
                  bg-[var(--card-bg)]
                  text-[var(--text-primary)]
                  hover:border-pink-400
                  hover:text-pink-500
                `
            }
          `}
        >

          <FiClock size={18} />

        </Link>


        {/* ==================================================
            NOTIFICATION
        ================================================== */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setShowNotifications(
                (prev) => !prev
              )
            }
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


            {unreadNotifications > 0 && (

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[10px]
                  font-semibold
                  text-white
                "
              >
                {unreadNotifications > 9
                  ? "9+"
                  : unreadNotifications}
              </span>

            )}

          </button>


          {/* NOTIFICATION DROPDOWN */}

          <AnimatePresence>

            {showNotifications && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  absolute
                  right-0
                  top-14
                  z-[999]
                  w-80
                  overflow-hidden
                  rounded-3xl
                  border
                  border-[var(--border-color)]
                  bg-[var(--card-bg)]
                  shadow-2xl
                  backdrop-blur-2xl
                "
              >

                {/* HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[var(--border-color)]
                    px-5
                    py-4
                  "
                >

                  <div>

                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-[var(--text-primary)]
                      "
                    >
                      Notifications
                    </h3>


                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-[var(--text-secondary)]
                      "
                    >
                      Account activity
                    </p>

                  </div>


                  {notifications.length > 0 && (

                    <button
                      type="button"
                      onClick={markAllRead}
                      className="
                        text-[11px]
                        font-medium
                        text-pink-500
                        hover:text-violet-500
                      "
                    >
                      Mark all read
                    </button>

                  )}

                </div>


                {/* LIST */}

                <div className="max-h-80 overflow-y-auto">

                  {notifications.length === 0 ? (

                    <div className="px-5 py-10 text-center">

                      <FiBell
                        size={28}
                        className="
                          mx-auto
                          text-[var(--text-secondary)]
                        "
                      />


                      <p
                        className="
                          mt-3
                          text-sm
                          font-medium
                          text-[var(--text-primary)]
                        "
                      >
                        No notifications
                      </p>


                      <p
                        className="
                          mt-1
                          text-xs
                          text-[var(--text-secondary)]
                        "
                      >
                        Account activity will
                        appear here.
                      </p>

                    </div>

                  ) : (

                    notifications.map(
                      (notification) => (

                        <div
                          key={notification.id}
                          className={`
                            border-b
                            border-[var(--border-color)]
                            px-5
                            py-4
                            transition

                            ${
                              !notification.read
                                ? "bg-pink-500/5"
                                : ""
                            }
                          `}
                        >

                          <div className="flex gap-3">

                            <div
                              className={`
                                mt-1
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl

                                ${
                                  notification.type ===
                                  "logout"
                                    ? "bg-red-500/10 text-red-500"
                                    : "bg-green-500/10 text-green-500"
                                }
                              `}
                            >

                              {notification.type ===
                              "logout" ? (
                                <FiLogOut size={15} />
                              ) : (
                                <FiBell size={15} />
                              )}

                            </div>


                            <div className="min-w-0 flex-1">

                              <p
                                className="
                                  text-sm
                                  font-semibold
                                  text-[var(--text-primary)]
                                "
                              >
                                {notification.title ||
                                  "Notification"}
                              </p>


                              <p
                                className="
                                  mt-1
                                  text-xs
                                  leading-5
                                  text-[var(--text-secondary)]
                                "
                              >
                                {notification.message}
                              </p>


                              <p
                                className="
                                  mt-2
                                  text-[10px]
                                  text-[var(--text-secondary)]
                                "
                              >
                                {notification.time ||
                                  notification.createdAt}
                              </p>

                            </div>

                          </div>

                        </div>

                      )
                    )

                  )}

                </div>


                {/* CLEAR */}

                {notifications.length > 0 && (

                  <div
                    className="
                      border-t
                      border-[var(--border-color)]
                      p-3
                    "
                  >

                    <button
                      type="button"
                      onClick={clearNotifications}
                      className="
                        w-full
                        rounded-xl
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-red-500
                        transition
                        hover:bg-red-500/10
                      "
                    >
                      Clear notifications
                    </button>

                  </div>

                )}

              </motion.div>

            )}

          </AnimatePresence>

        </div>


        {/* ==================================================
            THEME
        ================================================== */}

        <button
          type="button"
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

          {theme === "dark" ? (
            <FiSun size={18} />
          ) : (
            <FiMoon size={18} />
          )}

        </button>


        {/* ==================================================
            CLOCK
        ================================================== */}

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


        {/* ==================================================
            PROFILE
        ================================================== */}

        <div
          ref={dropdownRef}
          className="relative"
        >

          {/* PROFILE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setDropdown(
                (prev) => !prev
              )
            }
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

            {/* AVATAR */}

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


            {/* NAME */}

            <div className="hidden lg:block text-left">

              <p
                className="
                  max-w-[130px]
                  truncate
                  text-sm
                  font-semibold
                  text-[var(--text-primary)]
                "
              >
                {currentUser.name}
              </p>


              <div className="mt-1 flex items-center gap-2">

                <div
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-green-500
                  "
                />

                <span
                  className="
                    text-[11px]
                    text-green-500
                  "
                >
                  Online
                </span>

              </div>

            </div>


            <FiChevronDown
              size={15}
              className="
                hidden
                lg:block
                text-[var(--text-secondary)]
              "
            />

          </button>


          {/* ==================================================
              PROFILE DROPDOWN
          ================================================== */}

          <AnimatePresence>

            {dropdown && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 12,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  absolute
                  right-0
                  top-16
                  z-[999]
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

                {/* USER INFO */}

                <div
                  className="
                    border-b
                    border-[var(--border-color)]
                    bg-[var(--glass)]
                    p-5
                  "
                >

                  <div className="flex items-center gap-4">

                    {/* AVATAR */}

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


                    {/* USER DATA */}

                    <div className="min-w-0 flex-1">

                      <h3
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        {currentUser.name}
                      </h3>


                      <p
                        className="
                          mt-1
                          truncate
                          text-xs
                          text-[var(--text-secondary)]
                        "
                      >
                        {currentUser.email}
                      </p>


                      <div className="mt-2 flex items-center gap-2">

                        <div
                          className="
                            h-2
                            w-2
                            rounded-full
                            bg-green-500
                          "
                        />

                        <span
                          className="
                            text-[11px]
                            font-medium
                            text-green-500
                          "
                        >
                          Online
                        </span>

                      </div>

                    </div>

                  </div>

                </div>


                {/* ==================================================
                    SETTINGS
                ================================================== */}

                <button
                  type="button"
                  onClick={() => {

                    setDropdown(false);

                    navigate("/settings");

                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-5
                    py-3.5
                    text-left
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

                </button>


                {/* ==================================================
                    LOGOUT
                ================================================== */}

                <button
                  type="button"
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

                  <span>
                    Logout
                  </span>

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
