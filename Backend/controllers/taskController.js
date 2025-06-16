const TaskModel = require("../models/TaskModel");
const UserModel = require("../models/UserModel");

// Create a new Task
const createTask = async (req, res) => {
  let { title, description, category, price, deadline, status, location } =
    req.body;
  try {
    const userId = req.user._id; // from JWT middleware
    console.log(userId);

    const taskData = {
      title,
      description,
      category,
      price,
      deadline,
      status,
      location,
      createdBy: userId,
    };

    const newTask = await TaskModel.create(taskData);

    // Push task ID to user's posts array
    await UserModel.findByIdAndUpdate(userId, {
      $push: { posts: newTask._id },
    });

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
};

// Get all Tasks (optionally filter by status/category)
const getAllTasks = async (req, res) => {
  try {
    const filters = {};

    if (req.query.status) filters.status = req.query.status;
    if (req.query.category) filters.category = req.query.category;

    const tasks = await TaskModel.find(filters).populate(
      "createdBy",
      "name role"
    );
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

// Get Single Task by ID
const getTaskById = async (req, res) => {
  try {
    console.log(req.params.id);

    const task = await TaskModel.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
};

// Update a Task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

// Delete a Task
const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Also remove task reference from user
    await UserModel.findByIdAndUpdate(task.createdBy, {
      $pull: { posts: task._id },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
