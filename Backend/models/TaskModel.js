const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      required: true,
      enum: [
        "Cleaning",
        "Delivery",
        "Tutoring",
        "Gardening",
        "Repair",
        "Event Help",
        "Cooking",
        "Driving",
        "Pet Care",
        "Shopping",
        "Babysitting",
        "Tech Support",
        "Moving Help",
        "Data Entry",
        "Photography",
      ],
    },
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
      city: {
        type: String,
        enum: ["Indore", "Dewas", "Ujjain", "Delhi"],
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
