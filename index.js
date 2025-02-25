import connectToDatabase from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/", userRoute);
app.use("/admin", adminRoute);

connectToDatabase()
  .then(() => {
    console.log("Connected!");
  })
  .catch((error) => {
    console.error("Database Connection Failed", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
