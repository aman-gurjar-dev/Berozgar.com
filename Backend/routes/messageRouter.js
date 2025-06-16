const express = require("express");
const router = express.Router();
const isLoggedIn  = require("../middleware/authMiddleware");
const {
  sendMessage,
  featchAllMessages,
} = require("../controllers/messageController");

router.post("/send", isLoggedIn, sendMessage);
router.post("/featchmessages", isLoggedIn, featchAllMessages);

module.exports = router;
