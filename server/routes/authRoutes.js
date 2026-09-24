import express from "express";
import { registerUser, loginUser, sendOtp, verifyOtp, getProfile, updateProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/profile/:identifier", getProfile);
router.put("/profile", updateProfile);

export default router;
