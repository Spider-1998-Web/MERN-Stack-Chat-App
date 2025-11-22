import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;



// middleware
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1); // 🔥 important for cookies

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
 
});
