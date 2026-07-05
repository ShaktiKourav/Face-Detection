import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">

      {/* ================= Background ================= */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-52 -top-52 h-[500px] w-[500px] rounded-full bg-pink-300/20 blur-[150px]" />

        <div className="absolute right-[-180px] top-1/3 h-[550px] w-[550px] rounded-full bg-violet-300/20 blur-[170px]" />

        <div className="absolute left-1/2 bottom-[-200px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-200/20 blur-[150px]" />

      </div>

      {/* ================= Navbar ================= */}

      <header className="fixed top-0 left-72 right-0 z-50 h-20">
        <Navbar />
      </header>

      {/* ================= Sidebar ================= */}

      <aside className="fixed left-0 top-0 bottom-14 z-40  w-72 lg:block">
        <Sidebar />
      </aside>

      {/* ================= Main ================= */}

      <main
        className="
        ml-0
        lg:ml-72
        mt-20
        mb-14
        h-[calc(100vh-136px)]
        overflow-y-auto
        px-6
        py-8
        lg:px-10
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .35 }}
          className="mx-auto w-full max-w-[1600px] space-y-8"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* ================= Footer ================= */}

      {/* <footer className="fixed bottom-0 left-0 right-0 z-50 h-14">
        <Footer />
      </footer> */}

    </div>
  );
};

export default MainLayout;