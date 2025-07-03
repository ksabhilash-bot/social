import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("Successfully connected", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};
