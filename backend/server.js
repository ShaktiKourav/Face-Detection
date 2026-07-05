import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import path from "path";
import connectDB from "./config/db.js";
import detectionRoutes from "./routes/detection.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use("/api/user", userRoutes);
app.use(express.json());

app.use(cookieParser());
app.use("/api/detection", detectionRoutes);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Face Detection Backend Running 🚀",
  });
});

/* ================= Routes ================= */

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});