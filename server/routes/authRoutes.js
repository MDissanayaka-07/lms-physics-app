import express from "express";
import {
  registerUser,
  saveProfile,
  loginUser,
  verifyOtp,
  changePassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/profile", saveProfile);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/change-password", changePassword);

export default router;


