import express from "express";

import {
  createProduct,
  deleteProduct,
  getproducts,
  getproduct,
  updateProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getproducts);

router.get("/getproduct/:id", getproduct);

router.post("/create", verifyToken, createProduct);

router.put("/update/:productId", verifyToken, updateProduct);

router.delete("/delete/:productId", verifyToken, deleteProduct);

export default router;
