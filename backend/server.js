


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

/* ================= Routes ================= */

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import detectionRoutes from "./routes/detection.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import historyRoutes from "./routes/history.routes.js";
import musicRoutes from "./routes/music.routes.js";

/* ================= Middleware ================= */

import errorHandler from "./middleware/error.middleware.js";

/* ==========================================================
   APP
========================================================== */

const app = express();

/* ==========================================================
   ENVIRONMENT
========================================================== */

const PORT = Number(process.env.PORT) || 5000;

const NODE_ENV =
  process.env.NODE_ENV || "development";

/* ==========================================================
   __dirname
========================================================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ==========================================================
   CORS
========================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .map((url) => url.replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      /*
       * Allow requests without Origin header.
       * Useful for:
       * - Postman
       * - server-to-server requests
       * - health checks
       */

      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (
        allowedOrigins.includes(normalizedOrigin)
      ) {
        return callback(null, true);
      }

      console.warn(
        `⚠️ CORS blocked request from: ${origin}`
      );

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* ==========================================================
   BODY PARSERS
========================================================== */

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(cookieParser());

/* ==========================================================
   STATIC FILES
========================================================== */

/*
 * Detection uploaded images
 */

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

/*
 * Music
 */

app.use(
  "/music",
  express.static(
    path.join(
      process.cwd(),
      "public",
      "music"
    )
  )
);

/*
 * Public images
 */

app.use(
  "/images",
  express.static(
    path.join(
      process.cwd(),
      "public",
      "images"
    )
  )
);

/* ==========================================================
   HEALTH CHECK
========================================================== */

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message:
      "🚀 AI MoodSense Backend Running Successfully",
    version: "1.0.0",
    environment: NODE_ENV,
  });
});

/* ==========================================================
   API HEALTH CHECK
========================================================== */

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

/* ==========================================================
   API ROUTES
========================================================== */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/detection",
  detectionRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/history",
  historyRoutes
);

app.use(
  "/api/music",
  musicRoutes
);

/* ==========================================================
   404 HANDLER
========================================================== */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.originalUrl,
  });
});

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

app.use(errorHandler);

/* ==========================================================
   START SERVER
========================================================== */

const startServer = async () => {
  try {
    console.log(
      "=============================================="
    );

    console.log(
      "🔄 Connecting to MongoDB..."
    );

    await connectDB();

    console.log(
      "✅ MongoDB connected successfully"
    );

    const server = app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(`
==================================================
🚀 AI MoodSense Server Started
==================================================
🌐 PORT        : ${PORT}
📦 MODE        : ${NODE_ENV}
🔗 CLIENT URL  : ${
          process.env.CLIENT_URL ||
          "Not configured"
        }
==================================================
        `);
      }
    );

    /* ======================================================
       GRACEFUL SHUTDOWN
    ====================================================== */

    const shutdown = (signal) => {
      console.log(
        `\n⚠️ ${signal} received. Shutting down server...`
      );

      server.close(() => {
        console.log(
          "✅ Server closed successfully."
        );

        process.exit(0);
      });
    };

    process.on(
      "SIGTERM",
      () => shutdown("SIGTERM")
    );

    process.on(
      "SIGINT",
      () => shutdown("SIGINT")
    );

  } catch (error) {
    console.error(
      "❌ Failed to start server:"
    );

    console.error(error);

    process.exit(1);
  }
};

/* ==========================================================
   PROCESS ERROR HANDLING
========================================================== */

process.on(
  "uncaughtException",
  (error) => {
    console.error(
      "❌ UNCAUGHT EXCEPTION:"
    );

    console.error(error);

    process.exit(1);
  }
);

process.on(
  "unhandledRejection",
  (error) => {
    console.error(
      "❌ UNHANDLED REJECTION:"
    );

    console.error(error);

    process.exit(1);
  }
);

/* ==========================================================
   BOOT
========================================================== */

startServer();

/* ==========================================================
   EXPORT
========================================================== */

export default app;

