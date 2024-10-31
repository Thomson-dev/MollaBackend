import Product from '../models/productModel.js';
import { errorHandler } from "../utils/error.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

export const getproducts = async (req, res, next) => {
    try {
      const product = await Product.find({}).sort({ createdAt: -1 });
      const totalPosts = await Product.countDocuments();
  
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await Product.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      const response = {
       product,
        totalPosts,
        lastMonthPosts,
      };
  
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
} 