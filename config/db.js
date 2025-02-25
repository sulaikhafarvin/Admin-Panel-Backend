import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DB_URL;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connect to Mongodb With Mongoos");
  } catch (error) {
    console.log("Mongoose Connection error: ", error);
  }
};

export default connectToDatabase;
