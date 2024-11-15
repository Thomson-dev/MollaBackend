import express from "express";

import { addAddress } from "../controllers/addressController.js";

const router = express.Router();

router.post("/", addAddress);

export default router;
