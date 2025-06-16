const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/AdminModel");
const UserModel = require("../models/UserModel");

// register
const register = async (req, res) => {
  const { name, email, password, phone, poster, bio, skills, location } =
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
      poster,
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
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
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
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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

module.exports = { register, getProfile, login };
