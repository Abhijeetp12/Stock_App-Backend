import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3001", 
      process.env.FRONTEND_URL,
    ],
    credentials: true, 
  })
);

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);

export default app;
