

import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";
import api from "./services/api";
import { useAuth } from "./context/AuthContext";

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/responsive.css";

function App() {
  const {
    login,
    logout,
  } = useAuth();

  /* ==========================================================
     RESTORE / VERIFY AUTHENTICATION
  ========================================================== */

  useEffect(() => {
    let mounted = true;

    const restoreAuthentication = async () => {
      const token = localStorage.getItem("token");

      /*
       * No token = user is not authenticated.
       *
       * Do not call profile API.
       */
      if (!token) {
        return;
      }

      try {
        /*
         * Use configured Axios instance.
         *
         * api.js automatically attaches:
         *
         * Authorization: Bearer <token>
         */
        const { data } = await api.get(
          "/auth/profile"
        );

        if (!mounted) {
          return;
        }

        /*
         * Backend returned a valid user.
         *
         * Restore user into AuthContext.
         */
        if (data?.success && data?.user) {
          login(
            data.user,
            token
          );

          console.log(
            "✅ Authentication restored"
          );
        } else {
          /*
           * Unexpected profile response.
           */
          console.warn(
            "⚠️ Invalid profile response"
          );

          await logout();
        }

      } catch (error) {
        if (!mounted) {
          return;
        }

        console.error(
          "❌ Authentication restore failed:",
          error.response?.data?.message ||
            error.message
        );

        /*
         * Token is invalid/expired.
         *
         * logout() clears:
         * - localStorage token
         * - localStorage user
         * - isLoggedIn
         * - React user state
         * - React token state
         */
        await logout();
      }
    };

    restoreAuthentication();

    return () => {
      mounted = false;
    };
  }, []);

  /* ==========================================================
     UI
  ========================================================== */

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
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="
        fixed
        inset-0
        -z-50
        overflow-hidden
      ">
        {/* Pink Glow */}

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

        {/* Purple Glow */}

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

        {/* Cyan Glow */}

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

        {/* Grid */}

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

      {/* ======================================================
          MAIN APPLICATION
      ====================================================== */}

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