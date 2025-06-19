const messageModel = require("../models/messageModel");
const conversationModel = require("../models/convercationModel");
const TaskModel = require("../models/TaskModel");

async function sendMessage(req, res) {
  try {
    const { receiverId, message } = req.body;

    // 1. Create the message
    const newMessage = await messageModel.create({
      senderId: req.user._id,
      receiverId,
      message,
    });

    // 2. Find or create the conversation
    let conversation = await conversationModel.findOne({
      participants: { $all: [req.user._id, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [req.user._id, receiverId],
        messageIds: [newMessage._id],
      });
    } else {
      conversation.messageIds.push(newMessage._id);
      await conversation.save();
    }

    res.status(200).json({
      message: "Message sent successfully!",
      data: newMessage,
      convercation: conversation,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
}

// fetch all messages from both the id

async function featchAllMessages(req, res) {
  try {
    let { receiverId } = req.body;

    const convercation = await conversationModel
      .findOne({
        participants: { $all: [req.user._id, receiverId] },
      })
      .populate("messageIds");
    res.status(200).json({ messages: convercation.messageIds });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error.", error: error.message });
  }
}

const featchAllUsers = async (req, res) => {
  try {
    const users = await TaskModel.find({
      createdBy: req.user._id,
      assignedTo: { $ne: null },
    });

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error. from fetch all users",
      error: error.message,
    });
  }
};

module.exports = { sendMessage, featchAllMessages, featchAllUsers };
