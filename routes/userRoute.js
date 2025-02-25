import { Router } from "express";
import {
  createUser,
  loginUser,
  userHome,
} from "../controller/userController.js";
import { authenticateUser } from "../middleware/auth.js";

const userRoute = Router();

userRoute.post("/signup", createUser);
userRoute.post("/login", loginUser);
userRoute.get("/home", authenticateUser, userHome);

export default userRoute;
