const mongoose = require("mongoose");
const Task = require("./TaskModel");

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["poster", "tasker"], default: "tasker" },
    bio: { type: String, maxlength: 300 },
    skills: [{ type: String }],
    location: {
      city: { type: String, default: "Indore" },
      area: { type: String },
    },

    rating: [{ type: Number, min: 1, max: 5 }],
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },

    tasksPosted: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },

    profileImage: { type: String, default: "" },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    // Other features (optional)
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
