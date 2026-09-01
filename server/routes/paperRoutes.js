import express from "express";
import { getPapers, createPaper } from "../controllers/paperController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPapers);
router.post("/", protect, upload.single("file"), createPaper);

export default router;
