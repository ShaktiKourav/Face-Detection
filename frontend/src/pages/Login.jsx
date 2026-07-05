import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  MdFaceRetouchingNatural,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";




const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("STEP 1");
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
        console.log("STEP 2");
      // Firebase Token
      const token = await result.user.getIdToken();
      console.log("TOKEN:", token);
      localStorage.setItem("token", token);

      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      );


console.log("TOKEN:", token);

localStorage.setItem("token", token);

console.log(
  "Saved:",
  localStorage.getItem("token")
);


      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Firebase Token
      const token = await result.user.getIdToken();
      console.log("TOKEN:", token);
      localStorage.setItem("token", token);

      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          phone: result.user.phoneNumber || "",
        })
      );

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-2">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/80 bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(168,85,247,.15)]"
      >
        {/* Top */}

        <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-8 py-8 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl">
            <MdFaceRetouchingNatural
              className="text-pink-500"
              size={60}
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-white">
            Face Detection
          </h1>

          <p className="mt-1 text-pink-100">
            Premium AI Detection System
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8"
        >

          {/* Email */}

          <div>
            <label className="mb-1 block font-medium">
              Email Address
            </label>

            <div className="flex items-center rounded-2xl border border-violet-100 bg-white px-4 py-3">

              <MdEmail
                className="text-violet-500"
                size={22}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="ml-3 w-full bg-transparent outline-none"
                onChange={handleChange}
                value={form.email}
              />

            </div>
          </div>

          {/* Password */}

          <div>

            <label className="mb-1 pt-2 block font-medium">
              Password
            </label>

            <div className="flex items-center rounded-2xl border border-violet-100 bg-white px-4 py-3">

              <MdLock
                className="text-violet-500"
                size={22}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className="ml-3 w-full bg-transparent outline-none"
                onChange={handleChange}
                value={form.password}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <MdVisibilityOff size={22} />
                ) : (
                  <MdVisibility size={22} />
                )}
              </button>

            </div>

          </div>

          {/* Remember */}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm">

              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />

              Remember Me

            </label>

            <Link
              to="#"
              className="text-sm font-medium text-pink-500"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 font-semibold text-white shadow-xl transition hover:scale-[1.02]"
          >
            Sign In
          </button>


                {/* Divider */}

<div className="flex items-center gap-3">

  <div className="h-px flex-1 bg-gray-200" />

  <span className="text-sm text-gray-400">
    OR
  </span>

  <div className="h-px flex-1 bg-gray-200" />

</div>

{/* Google Login */}

<button
  type="button"
  onClick={handleGoogleLogin}
  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3.5 font-semibold text-gray-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-lg"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="h-5 w-5"
  />

  Continue with Google
</button>


          {/* Bottom */}

        </form>
      </motion.div>
    </div>
  );
};

export default Login;