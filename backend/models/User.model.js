
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    profileImage: {
      type: String,
      default: "",
    },

    currentMood: {
      type: String,
      enum: [
        "Happy",
        "Sad",
        "Angry",
        "Neutral",
        "Fear",
        "Disgust",
        "Surprised",
        "Romantic",
      ],
      default: "Neutral",
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: "",
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


/* ==========================================================
   PASSWORD HASH
========================================================== */

userSchema.pre("save", async function () {
  // Google account
  if (!this.password) {
    return;
  }

  // Password has not changed
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});


/* ==========================================================
   COMPARE PASSWORD
========================================================== */

userSchema.methods.comparePassword = async function (
  enteredPassword
) {
  if (!this.password) {
    return false;
  }

  return bcrypt.compare(
    enteredPassword,
    this.password
  );
};


/* ==========================================================
   MODEL
========================================================== */

const User = mongoose.model(
  "User",
  userSchema
);

export default User;