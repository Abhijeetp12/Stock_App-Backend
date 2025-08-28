import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3001", 
      "https://your-frontend-domain.com", 
    ],
    credentials: true, 
  })
);

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);

export default app;
