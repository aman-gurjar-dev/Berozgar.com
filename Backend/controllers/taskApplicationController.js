const TaskApplication = require("../models/ApplicationModel");
const Task = require("../models/TaskModel");

// Apply for a task
const applyForTask = async (req, res) => {
  try {
    const { taskId, message } = req.body;
    const applicantId = req.user._id;

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
    const { applicationId, approval } = req.body;

    const application = await TaskApplication.findById({
      application: applicationId,
    });
    if (!application || application.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Invalid or already handled application." });
    }

    // Approve this application
    if (approval == true) {
      application.status = "approved";
      await application.save();
    }

    // Reject others
    else {
      await TaskApplication.updateMany(
        { task: application.task, _id: { $ne: application._id } },
        { $set: { status: "rejected" } }
      );

      return res.status(200).json({
        message: "Application rejected, others have been updated",
      });
    }

    // Assign user to task
    const updatedTask = await Task.findByIdAndUpdate(
      application.task,
      {
        assignedTo: application.applicant,
        status: "in-progress",
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Application approved", task: updatedTask });
  } catch (error) {
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

module.exports = {
  applyForTask,
  approveApplication,
  getTaskApplications,
};
