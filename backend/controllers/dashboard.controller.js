import Detection from "../models/Detection.model.js";
import User from "../models/User.model.js";

/* ==========================================================
   Dashboard Summary
========================================================== */

export const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDetections = await Detection.countDocuments();

    const latestDetection = await Detection.findOne()
      .sort({ createdAt: -1 })
      .select("mood recommendedSong createdAt");

    const recentDetections = await Detection.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("personName mood recommendedSong createdAt");

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDetections,
        latestMood: latestDetection?.mood || "No Data",
        latestSong:
          latestDetection?.recommendedSong || "No Recommendation",
        recentDetections,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};

/* ==========================================================
   Mood Statistics
========================================================== */

export const getMoodStats = async (req, res) => {
  try {
    const stats = await Detection.aggregate([
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch mood statistics.",
    });
  }
};

/* ==========================================================
   Recent Activity
========================================================== */

export const getRecentActivity = async (req, res) => {
  try {
    const activities = await Detection.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch activity.",
    });
  }
};