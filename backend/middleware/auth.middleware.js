


import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

/*
==========================================================
  PROTECT MIDDLEWARE
  - Checks JWT from Authorization header
  - Verifies token
  - Finds user
  - Attaches user to req.user
==========================================================
*/

const protect = async (req, res, next) => {
  try {
    /* =====================================================
       GET TOKEN FROM AUTHORIZATION HEADER
    ===================================================== */

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please login first.",
      });
    }

    /* =====================================================
       EXTRACT JWT
    ===================================================== */

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing.",
      });
    }

    /* =====================================================
       VERIFY JWT
    ===================================================== */

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (error) {
      return res.status(401).json({
        success: false,
        message:
          error.name === "TokenExpiredError"
            ? "Session expired. Please login again."
            : "Invalid authentication token.",
      });
    }

    /* =====================================================
       CHECK TOKEN PAYLOAD
    ===================================================== */

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    /* =====================================================
       FIND USER
    ===================================================== */

    const user = await User.findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    /* =====================================================
       ATTACH USER TO REQUEST
    ===================================================== */

    req.user = user;

    /* =====================================================
       CONTINUE REQUEST
    ===================================================== */

    next();

  } catch (error) {
    console.error(
      "AUTH MIDDLEWARE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Authentication server error.",
    });
  }
};

export default protect;