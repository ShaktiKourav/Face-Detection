import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";
import { adminAuth } from "../config/firebaseAdmin.js";

export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

  const userData = {
  _id: user._id,
  name: user.name,
  email: user.email,
  profileImage: user.profileImage,
  role: user.role,
};

res.status(201).json({
  success: true,
  message: "Registration Successful",
  token: generateToken(user._id),
  user: userData,
});
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please enter Email and Password",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });

    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });

    }

    const userData = {
  _id: user._id,
  name: user.name,
  email: user.email,
  profileImage: user.profileImage,
  role: user.role,
};

res.status(200).json({
  success: true,
  message: "Login Successful",
  token: generateToken(user._id),
  user: userData,
});
  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const logoutUser = async (req, res) => {

  res.status(200).json({

    success: true,

    message: "Logout Successful",

  });

};


export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token required",
      });
    }

    // Verify Firebase Token
   const decoded = await adminAuth.verifyIdToken(token);

    const { uid, email, name, picture } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: uid,
        provider: "google",
        profileImage: picture,
        password: Math.random().toString(36).slice(-12),
        isVerified: true,
      });
    }else {
  user.googleId = uid;
  user.provider = "google";

  if (!user.profileImage && picture) {
    user.profileImage = picture;
  }

  await user.save();
}

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
    };

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token: generateToken(user._id),
      user: userData,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};


// export const getProfile = async (req, res) => {
//   console.log("Profile Controller");
//   try {

//     const user = req.user;

//     res.status(200).json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         profileImage: user.profileImage,
//         role: user.role,
//         provider: user.provider,
//         isVerified: user.isVerified,
//         createdAt: user.createdAt,
//       },
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };


/* ==========================================================
   GET PROFILE
========================================================== */


export const getProfile = async (req, res) => {
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














