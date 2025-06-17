const mongoose = require("mongoose");

const taskApplicationSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    message: { type: String }, // optional message by applicant
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaskApplication", taskApplicationSchema);
