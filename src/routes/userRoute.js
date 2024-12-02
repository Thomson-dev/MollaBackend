import express from "express";

import { signup, signin, getUserProfile, sendOtp, verifyOtpAndResetPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndResetPassword);
router.get('/profile/:userId', getUserProfile);

export default router;
