import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protect = async (req, res, next) => {
  try {
    /* ==================================================
       GET TOKEN FROM AUTHORIZATION HEADER
    ================================================== */

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Please login first.",
      });
    }

    /* ==================================================
       EXTRACT TOKEN
    ================================================== */

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Please login first.",
      });
    }

    /* ==================================================
       VERIFY JWT
    ================================================== */

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    /* ==================================================
       FIND USER
    ================================================== */

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    /* ==================================================
       ATTACH USER TO REQUEST
    ================================================== */

    req.user = user;

    /* ==================================================
       CONTINUE
    ================================================== */

    return next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

export default protect;