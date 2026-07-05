import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

/* ==========================================================
   Get User Profile
========================================================== */

export const getUserProfile = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================================
   Update User Profile
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

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================================
   Change Password
========================================================== */

export const changePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password is Incorrect",
      });
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================================
   Update Profile Image
========================================================== */

export const updateProfileImage = async (req, res) => {
  try {
    console.log("Controller reached");
    console.log(req.file);

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (req.file) {
      user.profileImage =
        "/uploads/profiles/" + req.file.filename;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Image Updated Successfully",
      profileImage: user.profileImage,
    });

  } catch (error) {
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

