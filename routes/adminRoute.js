import { Router } from "express";
import { authenticateAdmin } from "../middleware/auth.js";
import {
  adminLogin,
  adminDashboard,
  showUsers,
  deleteUsers,

} from "../controller/adminController.js";

const adminRoute = Router();

adminRoute.post("/login", adminLogin);
adminRoute.get("/users", authenticateAdmin, showUsers);
adminRoute.get("/dashboard", authenticateAdmin, adminDashboard);
adminRoute.delete("/delete/:userId", authenticateAdmin, deleteUsers);


export default adminRoute;
