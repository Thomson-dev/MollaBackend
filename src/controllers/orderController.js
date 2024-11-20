import Order from "../models/orderModal.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const storeOrders = async (req, res, next) => {
  const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
    req.body;

  if (
    !userId ||
    !cartItems ||
    !totalPrice ||
    !shippingAddress ||
    !paymentMethod
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Create an array of product objects from the cart items
  const products = cartItems.map((item) => ({
    name: item?.name,
    quantity: item?.quantity,
    price: item?.price,
    image: item?.image,
  }));

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const newOrder = new Order({
      user: userId,
      products: products,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating orders", error);
    next(errorHandler(500, "Error creating orders"));
  }
};

export const getOrders = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};


export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    const totalOrders = await Order.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const response = {
      orders,
      totalOrders,
      lastMonthOrders,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching orders", error);
    next(errorHandler(500, "Error fetching orders"));
  }
};