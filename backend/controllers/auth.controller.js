import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";


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

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token: generateToken(user._id),
      user,
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

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token: generateToken(user._id),

      user,

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

