const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAdmin,
  getUserAsAdmin,
  loginAdmin,
  UserVerify,
  getNotVerifyedUser,
} = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

router.post("/register", createAdmin);
router.post("/login", auth, loginAdmin);
router.get("/getadmin", auth, getAdmin);
router.get("/getuserasadmin", auth, getUserAsAdmin);
router.post("/verify", auth, UserVerify);
router.get("/notverifyedusers", auth, getNotVerifyedUser);

module.exports = router;
