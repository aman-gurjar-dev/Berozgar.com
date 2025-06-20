const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/authMiddleware");
const {
  sendMessage,
  featchAllMessages,
  featchAllUsers,
  fetchAllConvercation
} = require("../controllers/messageController");

router.post("/send", isLoggedIn, sendMessage);
router.post("/featchmessages", isLoggedIn, featchAllMessages);
router.get("/featchusers", isLoggedIn, featchAllUsers);
router.get("/convercation", isLoggedIn, fetchAllConvercation);


module.exports = router;
