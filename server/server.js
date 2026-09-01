import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import marksRoutes from "./routes/marksRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import paperRoutes from "./routes/paperRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "LMS Physics Backend active" });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/submissions", submissionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});