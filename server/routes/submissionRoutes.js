import express from "express";
import { getSubmissions, createSubmission } from "../controllers/submissionController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", protect, getSubmissions);
router.post("/", protect, upload.single("file"), createSubmission);

export default router;
