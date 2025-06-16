const Admin = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists Only One Admin Can Exist :" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created", admin: newAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login Admin

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("adminToken", token)
      .status(200)
      .json({
        message: "Login successful",
        admin: { _id: admin._id, name: admin.name, email: admin.email },
        adminToken: token,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get user as admin
const getUserAsAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne().populate("user");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "User Populate Success!", user: admin.user });
  } catch (error) {
    console.error("Error fetching admin with users:", error);
    res.status(500).json({ message: "Error in Admin fetch", error });
  }
};

// Get current admin
const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: "No admin found" });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// user verify
const UserVerify = async (req, res) => {
  try {
    let { userId, status } = req.body;

    if (status == false) {
      const user = await UserModel.findOneAndDelete({ _id: userId });

      return res
        .status(200)
        .json({ message: "User deleted successfully", user });
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { isVerified: true },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "User verified successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: "Error in verifying/deleting user",
      error: error.message,
    });
  }
};

module.exports = {
  createAdmin,
  getAdmin,
  loginAdmin,
  getUserAsAdmin,
  UserVerify,
};
