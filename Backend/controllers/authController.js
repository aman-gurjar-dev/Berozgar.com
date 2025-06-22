const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/AdminModel");
const UserModel = require("../models/UserModel");

// register
const register = async (req, res) => {
  const { name, email, password, phone, role, bio, skills, location } =
    req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
      role,
      bio,
      skills,
      location,
    });

    try {
      const admin = await AdminModel.findOne();
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      admin.user.push(user._id);
      await admin.save();
      console.log("User ID pushed to admin");
    } catch (error) {
      console.error("Error pushing user to admin:", error);
    }

    // Create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // ✅ required on Vercel (HTTPS)
        sameSite: "None", // ✅ must be None for cross-origin cookies
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "User registered",
        user: { id: user._id, name, email },
      });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // ✅ required on Vercel (HTTPS)
        sameSite: "None", // ✅ must be None for cross-origin cookies
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Logout Controller
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Error during logout" });
  }
};

// Get Current Logged-in User
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching current user" });
  }
};

const protectedRoute = (req, res) => {
  res.json({ message: "Access granted", user: req.user });
};

const updateProfile = async (req, res) => {
  const { name, bio, skills, location } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.location = location || user.location;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", err });
  }
};

module.exports = {
  register,
  getProfile,
  login,
  logout,
  getCurrentUser,
  protectedRoute,
  updateProfile,
};
