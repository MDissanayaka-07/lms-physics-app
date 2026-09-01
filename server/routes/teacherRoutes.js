import express from "express";
import { getAllStudents } from "../controllers/teacherController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/students", protect, getAllStudents);

export default router;
