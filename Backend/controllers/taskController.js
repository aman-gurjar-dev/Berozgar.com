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
    const { city, category, status, sort } = req.body; // ✅ from body now

    const filters = {};

    if (city) filters["location.city"] = city;
    if (category) filters.category = category;
    if (status) filters.status = status;

    let query = TaskModel.find(filters).populate("createdBy", "name role");

    if (sort === "newest") query = query.sort({ createdAt: -1 });
    else if (sort === "oldest") query = query.sort({ createdAt: 1 });
    else if (sort === "price_low") query = query.sort({ price: 1 });
    else if (sort === "price_high") query = query.sort({ price: -1 });

    const tasks = await query;

    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: err.message,
    });
  }
};

// Get Single Task by ID
const getTaskById = async (req, res) => {
  try {
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

const getMyTask = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("posts");

    if (!user || !user.posts || user.posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found. Please upload a task." });
    }

    res.status(200).json({
      message: "All your tasks fetched successfully!",
      tasks: user.posts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching your tasks", error: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTask,
};
