const express = require("express");
const router = express.Router();
const {
  applyForTask,
  approveApplication,
  getTaskApplications,
  rejectApplication,
} = require("../controllers/taskApplicationController");

const authenticate = require("../middleware/authMiddleware");

router.post("/apply", authenticate, applyForTask);
router.post("/approve", authenticate, approveApplication);
router.get("/:taskId", authenticate, getTaskApplications);
router.post("/reject", authenticate, rejectApplication);

module.exports = router;
