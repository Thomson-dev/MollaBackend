import express from "express";
import { getOrders, storeOrders } from "../controllers/orderController.js";



const router = express.Router();

router.post("/", storeOrders);
router.get("/:userId",getOrders );


export default router;