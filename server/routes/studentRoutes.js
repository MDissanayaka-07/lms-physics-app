import express from "express";
import { getStudentProfile, getStudentMarks } from "../controllers/studentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", protect, getStudentProfile);
router.get("/marks", protect, getStudentMarks);

export default router;
