const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  logout,
  getCurrentUser,
  protectedRoute,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/fetch", auth, getCurrentUser);
router.get("/profile", auth, getProfile);

// protected route for Frontend testing
router.get("/protected", auth, protectedRoute);

module.exports = router;
