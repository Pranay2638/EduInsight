import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import  pool  from "./config/DB.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EduInsight Backend Running");
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

import {subjectRouter} from './routes/subjectRoutes.js'
import authRouter from "./routes/authRoutes.js";
import sessionRouter from "./routes/studySessionRoute.js";
import quizzeRouter from "./routes/quizzeRoutes.js";
import analyticsRouter from "./routes/analyticsRoutes.js";
import intelligenceRouter from "./routes/intelligenceRoutes.js";
import profileRouter from "./routes/profileRoutes.js";

app.use("/api/subjects", subjectRouter);
app.use("/api/auth", authRouter);
app.use("/api/studySessions",sessionRouter)
app.use("/api/quizzes",quizzeRouter)
app.use("/api/analytics",analyticsRouter)
app.use("/api/intelligence",intelligenceRouter);
app.use("/api/profile",profileRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});