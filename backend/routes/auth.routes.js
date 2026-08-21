import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
  getProfile,
} from "../controllers/auth.controller.js";
const router = express.Router();

/* ================= Register ================= */

router.post("/register", registerUser);

/* ================= Login ================= */

router.post("/login", loginUser);

/* ================= Logout ================= */

router.post("/logout", logoutUser);

/* =================Google================= */

router.post("/google", googleLogin);


/* =================profile================= */

router.get("/profile", protect, getProfile);
export default router;












// import express from "express";
// import {
//   register,
//   login,
//   logout,
//   getProfile,
// } from "../controllers/auth.controller.js";

// import protect from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/profile", protect, getProfile);

// export default router;