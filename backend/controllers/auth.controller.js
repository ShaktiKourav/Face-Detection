



import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";
import { adminAuth } from "../config/firebaseAdmin.js";

/* ==========================================================
   SAFE USER DATA
   Never send password to frontend
========================================================== */

const getUserData = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage || "",
    currentMood: user.currentMood || "Neutral",
    role: user.role || "user",
    provider: user.provider || "local",
    isVerified: Boolean(user.isVerified),
  };
};

/* ==========================================================
   REGISTER
========================================================== */

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (
      !name?.trim() ||
      !email?.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters",
      });
    }

    /* ================= NORMALIZE ================= */

    const normalizedName = name.trim();
    const normalizedEmail =
      email.trim().toLowerCase();

    /* ================= CHECK EXISTING USER ================= */

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    /* ================= CREATE USER ================= */

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password,
      provider: "local",
      isVerified: false,
    });

    /* ================= JWT ================= */

    const token = generateToken(user._id);

    /* ================= RESPONSE ================= */

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: getUserData(user),
    });

  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error
    );

    /* ================= DUPLICATE EMAIL ================= */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Registration failed. Please try again.",
    });
  }
};

/* ==========================================================
   LOGIN
========================================================== */

export const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (
      !email?.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter Email and Password",
      });
    }

    /* ================= NORMALIZE ================= */

    const normalizedEmail =
      email.trim().toLowerCase();

    /* ================= FIND USER ================= */

    /*
     * IMPORTANT:
     * password has select:false in User.model.js.
     *
     * Therefore we explicitly include it here.
     */

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    /* ================= GOOGLE USER ================= */

    if (
      user.provider === "google" &&
      !user.password
    ) {
      return res.status(401).json({
        success: false,
        message:
          "This account uses Google login. Please continue with Google.",
      });
    }

    /* ================= PASSWORD CHECK ================= */

    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch =
      await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    /* ================= JWT ================= */

    const token =
      generateToken(user._id);

    /* ================= RESPONSE ================= */

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: getUserData(user),
    });

  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Login failed. Please try again.",
    });
  }
};

/* ==========================================================
   LOGOUT
========================================================== */

/*
 * JWT is stateless.
 *
 * Frontend removes the JWT during logout.
 * Firebase session is also cleared by AuthContext.
 */

export const logoutUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

/* ==========================================================
   GOOGLE LOGIN
========================================================== */

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    /* ================= VALIDATION ================= */

    if (!token) {
      return res.status(400).json({
        success: false,
        message:
          "Firebase token required",
      });
    }

    /* ================= VERIFY FIREBASE TOKEN ================= */

    const decoded =
      await adminAuth.verifyIdToken(token);

    const {
      uid,
      email,
      name,
      picture,
    } = decoded;

    /* ================= EMAIL CHECK ================= */

    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          "Google account email not available",
      });
    }

    /* ================= NORMALIZE EMAIL ================= */

    const normalizedEmail =
      email.trim().toLowerCase();

    /* ================= FIND USER ================= */

    let user = await User.findOne({
      email: normalizedEmail,
    });

    /* ========================================================
       CREATE NEW GOOGLE USER
    ======================================================== */

    if (!user) {
      user = await User.create({
        name:
          name?.trim() ||
          "Google User",

        email: normalizedEmail,

        googleId: uid,

        provider: "google",

        profileImage:
          picture || "",

        isVerified: true,
      });
    }

    /* ========================================================
       EXISTING USER
    ======================================================== */

    else {
      /*
       * Link Google account.
       */

      if (!user.googleId) {
        user.googleId = uid;
      }

      /*
       * If this is an existing local account,
       * keep provider as local.
       */

      if (!user.provider) {
        user.provider = "google";
      }

      if (
        !user.profileImage &&
        picture
      ) {
        user.profileImage = picture;
      }

      if (
        !user.name &&
        name
      ) {
        user.name = name.trim();
      }

      /*
       * Firebase has verified the Google account.
       */

      user.isVerified = true;

      await user.save();
    }

    /* ================= JWT ================= */

    const jwtToken =
      generateToken(user._id);

    /* ================= RESPONSE ================= */

    return res.status(200).json({
      success: true,
      message:
        "Google Login Successful",
      token: jwtToken,
      user: getUserData(user),
    });

  } catch (error) {
    console.error(
      "GOOGLE LOGIN ERROR:",
      error
    );

    return res.status(401).json({
      success: false,
      message:
        "Google authentication failed",
    });
  }
};

/* ==========================================================
   GET PROFILE
========================================================== */

export const getProfile = async (req, res) => {
  try {
    /* ================= AUTH CHECK ================= */

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }

    /* ================= RESPONSE ================= */

    return res.status(200).json({
      success: true,
      user: getUserData(req.user),
    });

  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch profile",
    });
  }
};