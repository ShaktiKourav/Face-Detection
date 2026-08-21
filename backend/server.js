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

/* ================= Config ================= */



connectDB();

const app = express();

/* ==========================================================
   __dirname
========================================================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ==========================================================
   MIDDLEWARE
========================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ==========================================================
   STATIC FILES
========================================================== */


app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
app.use(
  "/music",
  express.static(path.join(process.cwd(), "public/music"))
);

app.use(
  "/images",
  express.static(path.join(process.cwd(), "public/images"))
);

/* ==========================================================
   HEALTH CHECK
========================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 AI MoodSense Backend Running Successfully",
    version: "1.0.0",
  });
});

/* ==========================================================
   API ROUTES
========================================================== */

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/detection", detectionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/music", musicRoutes);

/* ==========================================================
   404 ROUTE
========================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ==========================================================
   ERROR HANDLER
========================================================== */

app.use(errorHandler);

/* ==========================================================
   SERVER
========================================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`
==================================================
🚀 AI MoodSense Server Started
==================================================
🌐 PORT : ${PORT}
📦 Mode : ${process.env.NODE_ENV || "development"}
==================================================
`);
});


process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});


