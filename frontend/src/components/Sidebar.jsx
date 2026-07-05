import { NavLink } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdFaceRetouchingNatural,
  MdHistory,
  MdSettings,
} from "react-icons/md";
import { FaMusic, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const menus = [
  {
    name: "Dashboard",
    icon: <MdDashboard size={22} />,
    path: "/dashboard",
  },
  {
    name: "Face Detection",
    icon: <MdFaceRetouchingNatural size={22} />,
    path: "/face-detection",
  },
  {
    name: "Music",
    icon: <FaMusic size={20} />,
    path: "/music",
  },
  {
    name: "History",
    icon: <MdHistory size={22} />,
    path: "/history",
  },
  {
    name: "Profile",
    icon: <FaUserCircle size={20} />,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: <MdSettings size={22} />,
    path: "/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-72  h-[calc(120vh-120px)] sticky top-0 ml-0  bottom-2 border border-white/70 bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,.12)] p-10">

      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="mb-5"
      >
        {/* Logo */}
       
                 <Link
                   to="/home"
                   className="flex items-center gap-4"
                 >
                   <motion.div
                     whileHover={{
                       rotate: 8,
                       scale: 1.05,
                     }}
                     className="
                     flex
                     h-14
                     w-14
                     items-center
                     justify-center
                     rounded-2xl
                     bg-gradient-to-br
                     from-pink-500
                     via-fuchsia-500
                     to-violet-600
                     text-white
                     shadow-xl
                     "
                   >
                     <MdFaceRetouchingNatural size={30} />
                   </motion.div>
       
                   <div className="hidden sm:block">
                     <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                       FaceDetect
                     </h1>
       
                     <p className="text-xs tracking-wide text-gray-500">
                       Premium Detection System
                     </p>
                   </div>
                 </Link>
                
      </motion.div>
     
      {/* Menu */}
      <nav className="flex flex-col gap-2 pt-5 flex-1">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-xl"
                  : "text-gray-800 hover:bg-violet-50 hover:text-violet-700"
              }`
            }
          >
            {item.icon}

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}

      <NavLink
        to="/login"
        className="mt-5 flex items-center justify-center gap-3 rounded-2xl px-4 bg-gradient-to-r from-pink-500 to-violet-600 py-2 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02]"
      >
        <FaSignOutAlt />
        Logout
      </NavLink>

      {/* Footer */}

      <div className="mt-8 mb-5 border-t border-violet-100 pt-5 text-center">
        <p className="text-xs text-gray-600">
          © 2026 Face Detection
        </p>

        <p className="text-xs text-gray-600 mt-1 mb-5">
          Developed by Shakti Kourav
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;