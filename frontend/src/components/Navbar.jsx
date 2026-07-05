import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSettings,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

import {
  MdDashboard,
  MdFaceRetouchingNatural,
  MdHistory,
} from "react-icons/md";

import { FaMusic } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const menu = [
    {
      title: "Dashboard",
      icon: <MdDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Face Detection",
      icon: <MdFaceRetouchingNatural size={20} />,
      path: "/face-detection",
    },
    {
      title: "History",
      icon: <MdHistory size={20} />,
      path: "/history",
    },
    {
      title: "Music",
      icon: <FaMusic size={18} />,
      path: "/music",
    },
  ];

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <>
      <motion.header
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: .45 }}
        className="
        fixed
        top-0
        left-72
        right-0
        z-50
        h-5
        border-b
        border-white/60
        bg-white/70
        p-8
        backdrop-blur-3xl
        shadow-[0_10px_35px_rgba(168,85,247,.08)]
        "
      >
        <div className="flex h-full items-center justify-between px-72 lg:px-10 w-full">

       
       
              

          {/* Search */}

          <div className="hidden  lg:flex flex-1 justify-center ">

            <div
              className="
              group
              flex
              w-full
              max-w-2xl
              items-center
              rounded-2xl
              border
              border-violet-100
              bg-white
              px-4
              mr-3
              py-2.5
              shadow-sm
              transition
              duration-300
              hover:shadow-lg
              focus-within:ring-2
              focus-within:ring-violet-300
              "
            >

              <FiSearch
                className="
                mr-3
                text-xl
                text-violet-500
                transition
                group-focus-within:rotate-90
                "
              />

              <input
                type="text"
                placeholder="Search dashboard, history, music..."
                className="
                w-full
                bg-transparent
                text-gray-700
                placeholder:text-gray-400
                outline-none
                "
              />

            </div>

          </div>

          {/* Right */}

          <div className="hidden lg:flex items-center gap-4">

            {/* Quick Menu */}

            {menu.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
                transition-all
                duration-300

                ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg"
                    : "bg-white hover:bg-violet-50 text-gray-600"
                }
                `}
              >
                {item.icon}
              </Link>
            ))}

            {/* Theme Toggle */}

              <ThemeToggle />

            {/* Notification */}

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: .95,
              }}
              className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white
              shadow-sm
              hover:bg-pink-50
              "
            >
              <FiBell
                className="text-pink-500"
                size={22}
              />

              <span className="absolute right-3 top-3 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>

                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
              </span>

            </motion.button>

            {/* Profile Button */}

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              onClick={() =>
                setProfileMenu(!profileMenu)
              }
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-violet-100
              bg-white
              px-3
              py-1
              shadow-sm
              hover:shadow-lg
              transition
              "
            >
              <img
                src="https://i.pravatar.cc/150?img=32"
                className="h-10 w-10 rounded-full object-cover"
                alt=""
              />

              <div className="text-left">

                <h4 className="font-semibold txt-sm leading-none">
                  Shakti Kourav
                </h4>

                <p className="mt-0 text-xs text-gray-500">
                  Administrator
                </p>

              </div>

              <FiChevronDown />
            </motion.button>

          </div>

          {/* Mobile */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="
            lg:hidden
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-white
            shadow
            "
          >
            {mobileMenu ? (
              <FiX size={25} />
            ) : (
              <FiMenu size={25} />
            )}
          </button>

        </div>
      </motion.header>

            {/* ================= Profile Dropdown ================= */}

      <AnimatePresence>
        {profileMenu && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setProfileMenu(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="fixed right-8 top-24 z-50 w-72 overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-2xl backdrop-blur-2xl"
            >
              <div className="bg-gradient-to-r from-pink-500 to-violet-600 p-6 text-white">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Profile"
                  className="mb-4 h-16 w-16 rounded-full border-4 border-white object-cover"
                />

                <h3 className="text-lg font-bold">Shakti Kourav</h3>

                <p className="text-sm text-white/90">
                  Administrator
                </p>
              </div>

              <div className="p-3">

                <Link
                  to="/profile"
                  onClick={() => setProfileMenu(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-violet-50"
                >
                  <FiUser size={18} />
                  My Profile
                </Link>

                <Link
                  to="/setting"
                  onClick={() => setProfileMenu(false)}
                  className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-violet-50"
                >
                  <FiSettings size={18} />
                  Settings
                </Link>

                <hr className="my-3" />

                <button
                  onClick={logout}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-3 font-semibold text-white transition hover:shadow-lg"
                >
                  <FiLogOut />
                  Logout
                </button>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= Mobile Menu ================= */}

      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
              className="fixed right-0 top-20 bottom-0 z-50 w-80 bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="mb-6 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=32"
                    alt="Profile"
                    className="h-14 w-14 rounded-full"
                  />

                  <div>
                    <h3 className="font-bold">
                      Shakti Kourav
                    </h3>

                    <p className="text-sm text-gray-500">
                      Administrator
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex items-center rounded-2xl border border-violet-100 bg-gray-50 px-4 py-3">
                <FiSearch className="mr-3 text-violet-500" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <div className="space-y-2">

                {menu.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    px-4
                    py-3
                    transition

                    ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white"
                        : "hover:bg-violet-50"
                    }
                    `}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}

                <Link
                  to="/profile"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-violet-50"
                >
                  <FiUser />
                  Profile
                </Link>

                <Link
                  to="/setting"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-violet-50"
                >
                  <FiSettings />
                  Settings
                </Link>

              </div>

              <button
                onClick={logout}
                className="absolute bottom-6 left-6 right-6 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 font-semibold text-white shadow-lg"
              >
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;