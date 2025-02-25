import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createToken } from "../middleware/auth.js";

dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, is_admin: 1 });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    if (user.is_admin === 0) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    const token = createToken(user._id, "admin");

    return res.status(201).json({
      token,
      role: "admin",
      message: "Admin logged in successfully!",
      user,
    });
  } catch (error) {
    console.error("Error in verify Admin Login:", error.message);
    res.status(500).json({ message: "Error in login!" });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    const users = await User.find({ is_admin: { $ne: 1 } }); // Exclude admin users
    return res.status(201).json({ users });
  } catch (error) {
    console.log(error.message);
  }
};

export const showUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error in fetching users" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    return res.status(201).json({ message: `${user.username} deleted!` });
  } catch (error) {
    console.log(error);
  }
};
