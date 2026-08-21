import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
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
    "Surprised",
    "Fear",
    "Disgust",
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
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: true,
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
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword =
async function (enteredPassword) {

    return await bcrypt.compare(
        enteredPassword,
        this.password
    );

};
const User = mongoose.model(
    "User",
    userSchema
);

export default User;