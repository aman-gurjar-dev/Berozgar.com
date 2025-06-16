const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, // e.g., Delivery, Repair
    price: { type: Number, required: true },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "cancelled"],
      default: "open",
    },

    // Relationships
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Location
    location: {
      city: { type: String },
      area: { type: String },
     
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
