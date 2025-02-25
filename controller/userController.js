import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { createToken } from "../middleware/auth.js";

dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      is_admin: 0,
    });
    if (user) {
      return res.status(201).json({ message: "Signin in Successful" });
    }
  } catch (error) {
    console.log("Error in Signup", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = createToken(user._id, "user");

    res
      .status(201)
      .json({ token, role: "user", user, message: "Login Successful" });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userHome = async (req, res) => {
  try {
    const user = await User.findById(req.payload.id); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user home:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
