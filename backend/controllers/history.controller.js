// import Detection from "../models/Detection.model.js";

// /* ==========================================================
//    Get All Detection History
// ========================================================== */

// export const getHistory = async (req, res) => {
//   try {
//     const history = await Detection.find()
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: history.length,
//       data: history,
//     });

//   } catch (error) {
//     console.error("History Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch history.",
//     });
//   }
// };

// /* ==========================================================
//    Get Single Detection
// ========================================================== */

// export const getHistoryById = async (req, res) => {
//   try {

//     const detection = await Detection.findById(req.params.id);

//     if (!detection) {
//       return res.status(404).json({
//         success: false,
//         message: "Detection not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: detection,
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch detection.",
//     });

//   }
// };

// /* ==========================================================
//    Delete One Detection
// ========================================================== */

// export const deleteHistory = async (req, res) => {
//   try {

//     const detection = await Detection.findById(req.params.id);

//     if (!detection) {
//       return res.status(404).json({
//         success: false,
//         message: "Detection not found.",
//       });
//     }

//     await Detection.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Detection deleted successfully.",
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to delete detection.",
//     });

//   }
// };

// /* ==========================================================
//    Clear Complete History
// ========================================================== */

// export const clearHistory = async (req, res) => {
//   try {

//     await Detection.deleteMany({});

//     res.status(200).json({
//       success: true,
//       message: "Detection history cleared successfully.",
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to clear history.",
//     });

//   }
// };


import Detection from "../models/Detection.model.js";

/* ==========================================================
   GET ALL HISTORY - LOGGED IN USER ONLY
========================================================== */

export const getHistory = async (req, res) => {
  try {
    const history = await Detection.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });

  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history.",
    });
  }
};


/* ==========================================================
   GET SINGLE HISTORY - LOGGED IN USER ONLY
========================================================== */

export const getHistoryById = async (req, res) => {
  try {

    const detection = await Detection.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Detection not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: detection,
    });

  } catch (error) {

    console.error("Get History By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch detection.",
    });
  }
};


/* ==========================================================
   DELETE ONE HISTORY - LOGGED IN USER ONLY
========================================================== */

export const deleteHistory = async (req, res) => {
  try {

    const detection = await Detection.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Detection not found.",
      });
    }

    await detection.deleteOne();

    res.status(200).json({
      success: true,
      message: "Detection deleted successfully.",
    });

  } catch (error) {

    console.error("Delete History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete detection.",
    });
  }
};


/* ==========================================================
   CLEAR COMPLETE HISTORY - LOGGED IN USER ONLY
========================================================== */

export const clearHistory = async (req, res) => {
  try {

    const result = await Detection.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Detection history cleared successfully.",
      deletedCount: result.deletedCount,
    });

  } catch (error) {

    console.error("Clear History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear history.",
    });
  }
};