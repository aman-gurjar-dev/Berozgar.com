const express = require("express");
const router = express.Router();
const {
  applyForTask,
  approveApplication,
  getTaskApplications,
} = require("../controllers/taskApplicationController");

const authenticate = require("../middleware/authMiddleware"); // your JWT middleware

router.post("/apply", authenticate, applyForTask);

// Approve an application (POST)
router.post("/approve", authenticate, approveApplication);

// Get all applications for a task (GET)
router.get("/:taskId", authenticate, getTaskApplications);

module.exports = router;
