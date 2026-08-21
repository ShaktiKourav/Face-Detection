import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  MdFaceRetouchingNatural,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdOutlineArrowForward,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import {
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  
  /* =====================================================
                      STATES
  ===================================================== */

  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({

    email: "",

    password: "",

    remember: false,

  });

  const [errors, setErrors] = useState({});

  /* =====================================================
                    INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

  };

  /* =====================================================
                    VALIDATION
  ===================================================== */

  const validate = () => {

    const newErrors = {};

    if (!form.email.trim()) {

      newErrors.email = "Email is required";

    }

    if (!form.password.trim()) {

      newErrors.password = "Password is required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };



//   const saveUser = (data) => {

//   localStorage.setItem("token", data.token);

//   localStorage.setItem("isLoggedIn", "true");

//   localStorage.setItem(
//     "theme",
//     localStorage.getItem("theme") || "light"
//   );

//   localStorage.setItem(
//     "user",
//     JSON.stringify(data.user)
//   );
// };


  /* =====================================================
                    EMAIL LOGIN
  ===================================================== */

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {
const { data } = await api.post(
  "/auth/login",
  {
    email: form.email,
    password: form.password,
  }
);

// Save user & JWT using AuthContext
login(data.user, data.token);

// Add login notification
addLoginNotification();

// Redirect
navigate("/dashboard");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    setLoading(false);

  }
};

  /* =====================================================
                    GOOGLE LOGIN
  ===================================================== */

 const handleGoogleLogin = async () => {

  setGoogleLoading(true);

  try {

    // Firebase Google Sign In
    const result = await signInWithPopup(
      auth,
      provider
    );

    // Firebase ID Token
    const firebaseToken = await result.user.getIdToken();

    // Backend Google Login
const { data } = await api.post(
  "/auth/google",
  {
    token: firebaseToken,
  }
);
// Save JWT + User using AuthContext
login(data.user, data.token);

// Add login notification
addLoginNotification();

// Redirect
navigate("/dashboard");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      error.message ||
      "Google Login Failed"
    );

  } finally {

    setGoogleLoading(false);

  }

};

/* =====================================================
                   notification
  ===================================================== */


const addLoginNotification = () => {
  try {

    const saved = localStorage.getItem("notifications");

    let existing = [];

    try {
      existing = saved ? JSON.parse(saved) : [];
    } catch {
      existing = [];
    }

    if (!Array.isArray(existing)) {
      existing = [];
    }

    const newNotification = {
      id: Date.now(),
      message: "You have successfully logged in.",
      type: "login",
      read: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [
      newNotification,
      ...existing,
    ];

    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("notificationUpdated")
    );

  } catch (error) {
    console.error(
      "Login notification error:",
      error
    );
  }
};

/* =====================================================
                    JSX
  ===================================================== */

  return (

<div
className="
relative
flex
min-h-screen
items-center
justify-center
overflow-hidden
bg-[var(--bg-color)]
px-4
py-6
transition-all
duration-300
"
>

{/* ================= Background ================= */}

<div className="absolute inset-0 overflow-hidden">

<div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-pink-500/15 blur-[140px]" />

<div className="absolute right-[-120px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[140px]" />

<div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

<div className="absolute inset-0 opacity-[0.03]
[background-image:linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)]
[background-size:42px_42px]" />

</div>

{/* ================= Main Card ================= */}

<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.5
}}

className="
relative
z-10
grid
w-full
max-w-6xl
overflow-hidden
rounded-[28px]
border
border-[var(--border-color)]
bg-[var(--glass)]
backdrop-blur-2xl
shadow-[var(--shadow-lg)]
lg:grid-cols-2
"

>

{/* =====================================================
                    LEFT PANEL
===================================================== */}

<div
className="
relative
hidden
overflow-hidden
bg-gradient-to-br
from-pink-500
via-fuchsia-500
to-violet-700
p-10
text-white
lg:flex
lg:flex-col
lg:justify-between
"
>

<div>

<div
className="
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-white
shadow-2xl
"
>

<MdFaceRetouchingNatural
size={54}
className="text-pink-500"
/>

</div>

<h1 className="mt-6 text-4xl font-bold">

AI MoodSense

</h1>

<p className="mt-4 max-w-sm text-[15px] leading-7 text-pink-100">

Experience premium AI powered Face Detection,
Emotion Recognition and Smart Music
Recommendation in one intelligent dashboard.

</p>

</div>

<div className="space-y-4">

{[
"Real-Time Face Detection",
"AI Mood Prediction",
"Smart Music Recommendation",
"Firebase Secure Login",
"Detection History",
"Dark & Light Theme",
].map((item)=>(

<div
key={item}
className="flex items-center gap-3"
>

<FiCheckCircle
size={20}
/>

<span className="text-[15px]">

{item}

</span>

</div>

))}

</div>

</div>

{/* ================= RIGHT PANEL START ================= */}

<div
className="
flex
items-center
justify-center
p-6
md:p-8
xl:p-10
"
>

<div className="w-full max-w-md">

{/* Mobile Logo */}

<div className="mb-6 text-center lg:hidden">

<div
className="
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-gradient-to-r
from-pink-500
to-violet-600
text-white
shadow-xl
"
>

<MdFaceRetouchingNatural
size={50}
/>

</div>

</div>

<h2 className="text-3xl font-bold text-[var(--text-primary)]">

Welcome Back 👋

</h2>

<p className="mt-2 text-sm text-[var(--text-secondary)]">

Sign in to continue to your premium AI dashboard.

</p>

<form
onSubmit={handleSubmit}
className="mt-8 space-y-5"
>
          {/* ================= EMAIL ================= */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
              Email Address
            </label>

            <div
              className="
              flex
              h-12
              items-center
              rounded-xl
              border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              px-4
              transition-all
              duration-300
              focus-within:border-pink-500
              focus-within:ring-4
              focus-within:ring-pink-500/10
              "
            >

              <MdEmail
                className="text-pink-500"
                size={20}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="
                ml-3
                w-full
                bg-transparent
                text-sm
                text-[var(--text-primary)]
                placeholder:text-[var(--text-secondary)]
                "
              />

            </div>

            {errors.email && (

              <p className="mt-2 text-xs text-red-500">

                {errors.email}

              </p>

            )}

          </div>

          {/* ================= PASSWORD ================= */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
              Password
            </label>

            <div
              className="
              flex
              h-12
              items-center
              rounded-xl
              border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              px-4
              transition-all
              duration-300
              focus-within:border-pink-500
              focus-within:ring-4
              focus-within:ring-pink-500/10
              "
            >

              <MdLock
                className="text-pink-500"
                size={20}
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="
                ml-3
                w-full
                bg-transparent
                text-sm
                text-[var(--text-primary)]
                placeholder:text-[var(--text-secondary)]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                text-[var(--text-secondary)]
                transition
                hover:text-pink-500
                "
              >

                {showPassword ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}

              </button>

            </div>

            {errors.password && (

              <p className="mt-2 text-xs text-red-500">

                {errors.password}

              </p>

            )}

          </div>

          {/* ================= REMEMBER ================= */}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">

              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-4 w-4 accent-pink-500"
              />

              Remember Me

            </label>

            <Link
              to="/forgot-password"
              className="
              text-sm
              font-medium
              text-pink-500
              transition
              hover:text-violet-600
              "
            >

              Forgot Password?

            </Link>

          </div>

          {/* ================= LOGIN BUTTON ================= */}

          <motion.button

            whileHover={{
              scale: 1.01,
            }}

            whileTap={{
              scale: .98,
            }}

            disabled={loading}

            type="submit"

            className="
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-gradient-to-r
            from-pink-500
            via-fuchsia-500
            to-violet-600
            text-sm
            font-semibold
            text-white
            shadow-lg
            transition
            "

          >

            {loading ? (

              <>

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                Signing In...

              </>

            ) : (

              <>

                Login

                <MdOutlineArrowForward size={20} />

              </>

            )}

          </motion.button>

          {/* ================= DIVIDER ================= */}

          <div className="flex items-center gap-4">

            <div className="h-px flex-1 bg-[var(--border-color)]" />

            <span className="text-xs text-[var(--text-secondary)]">
              OR
            </span>

            <div className="h-px flex-1 bg-[var(--border-color)]" />

          </div>

          {/* ================= GOOGLE LOGIN ================= */}

          <motion.button

            whileHover={{
              scale: 1.01,
            }}

            whileTap={{
              scale: .98,
            }}

            disabled={googleLoading}

            onClick={handleGoogleLogin}

            type="button"

            className="
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            text-sm
            font-semibold
            text-[var(--text-primary)]
            transition
            hover:border-pink-300
            hover:shadow-lg
            "

          >

            {googleLoading ? (

              <>

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />

                Connecting...

              </>

            ) : (

              <>

                <FcGoogle size={22} />

                Continue with Google

              </>

            )}

          </motion.button>
                    {/* ================= SECURITY CARD ================= */}

          <div
            className="
            rounded-2xl
            border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            p-4
            shadow-sm
            "
          >

            <div className="flex items-start gap-3">

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-pink-500
                to-violet-600
                text-white
                "
              >

                <FiShield size={18} />

              </div>

              <div>

                <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                  Secure Authentication
                </h4>

                <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">
                  Your account is protected using Firebase Authentication.
                  Login credentials remain encrypted and secure.
                </p>

              </div>

            </div>

          </div>

          {/* ================= CREATE ACCOUNT ================= */}

          <div className="pt-1 text-center">

            <p className="text-sm text-[var(--text-secondary)]">

              Don't have an account?

              <Link
                to="/register"
                className="
                ml-2
                font-semibold
                text-pink-500
                transition
                hover:text-violet-600
                "
              >
                Create Account
              </Link>

            </p>

          </div>

        </form>

      </div>

    </div>

  </motion.div>

</div>


  );
};

export default Login;





