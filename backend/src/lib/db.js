import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.mongodb_uri;
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB connected`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
