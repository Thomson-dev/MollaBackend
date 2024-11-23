import express from "express";

import { signup, signin, getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get('/profile/:userId', getUserProfile);

export default router;
