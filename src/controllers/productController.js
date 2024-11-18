import Product from "../models/productModel.js";
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
};

export const createProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }

  const { name, price, image, category, countInStock, description } = req.body;

  if (!name || !price || !image || !category || !countInStock || !description) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const product = new Product({
      name,
      price,
      image,

      category,
      countInStock,
      description,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product", error);
    next(errorHandler(500, "Error creating product"));
  }
};

export const updateProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    console.log(req.user.isAdmin);
    return next(
      errorHandler(403, "You are not allowed to update this product")
    );
  }

  const { name, price, image, category, countInStock, description } = req.body;

  if (!name || !price || !image || !category || !countInStock || !description) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: {
          name,
          price,
          image,

          category,
          countInStock,
          description,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return next(errorHandler(404, "Product not found"));
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product", error);
    next(errorHandler(500, "Error updating product"));
  }
};

export const deleteProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    const deletedPost = await Product.findByIdAndDelete(req.params.productId);

    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};
