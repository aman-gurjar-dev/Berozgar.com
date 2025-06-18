const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTask
} = require("../controllers/taskController");

// Auth required
router.post("/", auth, createTask);
router.post("/getalltasks", auth, getAllTasks);
router.get("/:id", auth, getTaskById);
router.get("/user/getmytask", auth, getMyTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
