import express from "express";

import { addAddress, deleteAddress, getAddresses } from "../controllers/addressController.js";

const router = express.Router();

router.post("/", addAddress);
router.get("/:userId", getAddresses);
router.delete('/:userId/address/:addressId', deleteAddress);

export default router;
