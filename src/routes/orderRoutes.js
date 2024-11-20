import express from "express";
import { getAllOrders, getOrders, storeOrders } from "../controllers/orderController.js";



const router = express.Router();

router.post("/", storeOrders);

router.get("/:userId",  getOrders );

router.get("/",  getAllOrders);


export default router;