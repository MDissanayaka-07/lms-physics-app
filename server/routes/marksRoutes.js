import express from "express";
import { addMark, getMarksByStudent } from "../controllers/marksController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, addMark);
router.get("/student/:studentId", protect, getMarksByStudent);

export default router;
