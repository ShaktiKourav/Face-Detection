import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // ================= Authorization Header =================

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ================= Token Missing =================

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Token Missing.",
      });
    }

    // ================= Verify Token =================

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ================= Find User =================

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // ================= Attach User =================

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default protect;