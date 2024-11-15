import express from "express";

import { addAddress, getAddresses } from "../controllers/addressController.js";

const router = express.Router();

router.post("/", addAddress);
router.get("/:userId", getAddresses);

export default router;
