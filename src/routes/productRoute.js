import express from "express";

import { getproducts } from "../controllers/productController.js";


const router = express.Router();


router.get("/", getproducts);


export default router;