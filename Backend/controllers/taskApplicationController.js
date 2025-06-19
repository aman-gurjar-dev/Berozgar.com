const TaskApplication = require("../models/ApplicationModel");
const Task = require("../models/TaskModel");

// Apply for a task
const applyForTask = async (req, res) => {
  try {
    const { taskId, message } = req.body;
    const applicantId = req.user._id;

    const task = await Task.findOne({ _id: taskId });
    if (task.assignedTo !== null) {
      return res.status(404).json({ message: "Task Already Assigned !!!" });
    }

    const alreadyApplied = await TaskApplication.findOne({
      task: taskId,
      applicant: applicantId,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this task." });
    }

    const application = await TaskApplication.create({
      task: taskId,
      applicant: applicantId,
      message,
    });

    res
      .status(200)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Error applying for task", error });
  }
};

// Approve a task application
const approveApplication = async (req, res) => {
  try {
    const { applicationId , taskId} = req.body;

    const application = await TaskApplication.findOne({
      applicant: applicationId,
      task: taskId,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    if (application.status !== "pending") {
      return res.status(400).json({ message: "Application already handled." });
    }

    // Approve this application
    application.status = "approved";
    await application.save();

    // Reject other applications for the same task
    await TaskApplication.updateMany(
      { task: application.task, _id: { $ne: application._id } },
      { $set: { status: "rejected" } }
    );

    // Assign user to the task and update task status
    const updatedTask = await Task.findOneAndUpdate(
      { _id: application.task },
      {
        assignedTo: application.applicant,
        status: "in-progress",
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Application approved and task updated",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving application", error });
  }
};

// Get all applications for a task (admin/poster)
const getTaskApplications = async (req, res) => {
  try {
    const { taskId } = req.params;
    const applications = await TaskApplication.find({ task: taskId })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Applications fetched", applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// Reject a specific application
const rejectApplication = async (req, res) => {
  try {
    const { applicationId } = req.body;

    const application = await TaskApplication.findOne({
      applicant: applicationId,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    if (application.status !== "pending") {
      return res.status(400).json({ message: "Application already handled." });
    }

    application.status = "rejected";
    await application.save();

    res.status(200).json({ message: "Application rejected successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting application", error });
  }
};

module.exports = {
  applyForTask,
  approveApplication,
  getTaskApplications,
  rejectApplication,
};
