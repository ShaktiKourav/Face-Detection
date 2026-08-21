import { useEffect } from "react";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/responsive.css";

function App() {
  // return (
  //   <div
  //     className="
  //     min-h-screen
  //     bg-[var(--bg-color)]
  //     text-[var(--text-primary)]
  //     transition-all
  //     duration-300
  //     overflow-x-hidden
  //   "
  //   >
  //     {/* ================= Background ================= */}

  //     <div className="fixed inset-0 -z-50 overflow-hidden">
  //       {/* Pink Glow */}

  //       <div
  //         className="
  //         absolute
  //         -top-52
  //         -left-52
  //         h-[520px]
  //         w-[520px]
  //         rounded-full
  //         bg-pink-500/15
  //         blur-[140px]
  //       "
  //       />

  //       {/* Purple Glow */}

  //       <div
  //         className="
  //         absolute
  //         right-[-180px]
  //         top-1/3
  //         h-[500px]
  //         w-[500px]
  //         rounded-full
  //         bg-violet-600/15
  //         blur-[140px]
  //       "
  //       />

  //       {/* Blue Glow */}

  //       <div
  //         className="
  //         absolute
  //         bottom-[-180px]
  //         left-1/3
  //         h-[420px]
  //         w-[420px]
  //         rounded-full
  //         bg-cyan-500/10
  //         blur-[120px]
  //       "
  //       />

  //       {/* Grid */}

  //       <div
  //         className="
  //         absolute
  //         inset-0
  //         opacity-[0.03]
  //         [background-image:linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)]
  //         [background-size:45px_45px]
  //       "
  //       />
  //     </div>

  //     {/* ================= Main ================= */}

  //     <main
  //       className="
  //       relative
  //       z-10
  //       min-h-screen
  //     "
  //     >
  //       <AppRoutes />
  //     </main>
  //   </div>
  // );

  const { login } = useAuth();

  useEffect(() => {

  const checkBackend = async () => {

    try {

     const res = await axios.get(
  `${import.meta.env.VITE_BACKEND_URL}/`
);
      console.log("✅ Backend Connected");
      console.log(res.data);

    } catch (err) {

      console.log("❌ Backend Not Running");

    }

  };

  const loadProfile = async () => {

    const token = localStorage.getItem("token");

    if (!token) return;

    try {

     const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/auth/profile`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      login(data.user, token);

      console.log("✅ Profile Loaded");

    } catch (err) {

      console.log("Profile not loaded");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

    }

  };

  checkBackend();

  loadProfile();

}, []);

  return (
    <div
      className="
      min-h-screen
      bg-[var(--bg-color)]
      text-[var(--text-primary)]
      transition-all
      duration-300
      overflow-x-hidden
    "
    >
      {/* ================= Background ================= */}

      <div className="fixed inset-0 -z-50 overflow-hidden">

        <div
          className="
          absolute
          -top-52
          -left-52
          h-[520px]
          w-[520px]
          rounded-full
          bg-pink-500/15
          blur-[140px]
        "
        />

        <div
          className="
          absolute
          right-[-180px]
          top-1/3
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-600/15
          blur-[140px]
        "
        />

        <div
          className="
          absolute
          bottom-[-180px]
          left-1/3
          h-[420px]
          w-[420px]
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
        />

        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)]
          [background-size:45px_45px]
        "
        />
      </div>

      {/* ================= Main ================= */}

      <main
        className="
        relative
        z-10
        min-h-screen
      "
      >
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;