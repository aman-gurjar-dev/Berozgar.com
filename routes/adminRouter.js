const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAdmin,
  getUserAsAdmin,
  loginAdmin,
  UserVerify,
} = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

router.post("/register", createAdmin);
router.get("/getadmin", auth, getAdmin);
router.get("/getuserasadmin", auth, getUserAsAdmin);
router.post("/login", auth, loginAdmin);
router.post("/verify", auth, UserVerify);

module.exports = router;
