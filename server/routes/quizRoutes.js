import express from "express";
import { getQuizzes, createQuiz } from "../controllers/quizController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getQuizzes);
router.post("/", protect, createQuiz);

export default router;
