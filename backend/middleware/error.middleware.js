/* ==========================================================
   Global Error Handler
========================================================== */

const errorMiddleware = (err, req, res, next) => {

  console.error("❌ Error:", err);

  let statusCode = err.statusCode || 500;

  let message = err.message || "Internal Server Error";

  /* ==========================================
        MONGODB INVALID OBJECT ID
  ========================================== */

  if (err.name === "CastError") {

    statusCode = 400;

    message = "Invalid resource ID.";

  }

  /* ==========================================
        MONGODB DUPLICATE KEY
  ========================================== */

  if (err.code === 11000) {

    statusCode = 400;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists.`;

  }

  /* ==========================================
        MONGOOSE VALIDATION ERROR
  ========================================== */

  if (err.name === "ValidationError") {

    statusCode = 400;

    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");

  }

  /* ==========================================
        JWT ERROR
  ========================================== */

  if (err.name === "JsonWebTokenError") {

    statusCode = 401;

    message = "Invalid authentication token.";

  }

  /* ==========================================
        JWT EXPIRED
  ========================================== */

  if (err.name === "TokenExpiredError") {

    statusCode = 401;

    message = "Authentication token has expired.";

  }

  /* ==========================================
        RESPONSE
  ========================================== */

  res.status(statusCode).json({

    success: false,

    message,

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),

  });

};

export default errorMiddleware;