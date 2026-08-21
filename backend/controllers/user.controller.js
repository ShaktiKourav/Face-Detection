

import User from "../models/User.model.js";

/* ==========================================================
   SAFE USER DATA
========================================================== */

const getSafeUser = (user) => {
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
   GET USER PROFILE
========================================================== */

export const getUserProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: getSafeUser(req.user),
    });
  } catch (error) {
    console.error("GET USER PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch user profile",
    });
  }
};

/* ==========================================================
   UPDATE USER PROFILE
========================================================== */

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    /* ================= NAME ================= */

    if (req.body.name !== undefined) {
      const name = req.body.name.trim();

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }

      if (name.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Name must contain at least 2 characters",
        });
      }

      user.name = name;
    }

    /* ================= SAVE ================= */

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: getSafeUser(user),
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

/* ==========================================================
   CHANGE PASSWORD
========================================================== */

export const changePassword = async (req, res) => {
  try {
    const {
      oldPassword,
      newPassword,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must contain at least 6 characters",
      });
    }

    /* ================= USER ================= */

    const user = await User.findById(req.user._id)
      .select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    /* ================= GOOGLE ACCOUNT ================= */

    if (
      user.provider === "google" &&
      !user.password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Google accounts cannot change password here. Please use Google authentication.",
      });
    }

    /* ================= PASSWORD CHECK ================= */

    const isMatch =
      await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password is Incorrect",
      });
    }

    /* ================= NEW PASSWORD ================= */

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to change password",
    });
  }
};

/* ==========================================================
   UPDATE PROFILE IMAGE
========================================================== */

export const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    /* ================= FILE CHECK ================= */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    /* ================= SAVE IMAGE PATH ================= */

    user.profileImage =
      `/uploads/profiles/${req.file.filename}`;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Image Updated Successfully",
      profileImage: user.profileImage,
    });

  } catch (error) {
    console.error(
      "UPDATE PROFILE IMAGE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update profile image",
    });
  }
};

