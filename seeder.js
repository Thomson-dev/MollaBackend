import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/productModel.js"; // Adjust the path as necessary
import connectDB from "./src/config/db.js"; // Adjust the path as necessary

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Define an array of products
const products = [
    {
      name: "StrideLite Runner",
      image:
        "https://unsplash.com/photos/closeup-photo-of-person-hiding-his-right-hand-in-his-pocket-eyFcZLLYvfA",
      brand: "Brand A",
      category: "trousers",
      description: "Lightweight and comfortable running shoes for daily use.",
      rating: 4.5,
      numReviews: 10,
      price: 29.99,
      countInStock: 100,
    },
    {
      name: "FlexMax Trainer",
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Brand A",
      category: "trousers",
      description: "Lightweight and comfortable running shoes for daily use.",
      rating: 4.5,
      numReviews: 10,
      price: 29.99,
      countInStock: 100,
    },
    {
      name: "TrailGuard Hiker",
      image:
        "https://unsplash.com/photos/a-person-wearing-a-coat-and-a-white-shirt-i7xsQUSCTFY",
      brand: "Brand A",
      category: "Jacket",
      description: "Lightweight and comfortable running shoes for daily use.",
      rating: 4.5,
      numReviews: 10,
      price: 29.99,
      countInStock: 100,
    },
    {
      name: "CitySprint Sneaker",
      image:
        "https://images.unsplash.com/photo-1580047883831-5db03837b0b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Brand A",
      category: "Jacket",
      description: "Lightweight and comfortable running shoes for daily use.",
      rating: 4.5,
      numReviews: 10,
      price: 29.99,
      countInStock: 100,
    },
    {
      name: "PeakPro Climber",
      image:
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Brand A",
      category: "Shoes",
      description: "Lightweight and comfortable running shoes for daily use.",
      rating: 4.5,
      numReviews: 10,
      price: 29.99,
      countInStock: 100,
    },
    {
      name: "CloudWalk Jogger",
      image:
        "https://unsplash.com/photos/brown-nike-sneaker-on-yellow-textile-NOpsC3nWTzYg",
      brand: "Brand B",
      category: "Shoes",
      description: "Stylish sneakers perfect for urban adventures.",
      rating: 4.0,
      numReviews: 8,
      price: 19.99,
      countInStock: 50,
    },
    {
      name: "EnduraTrail Walker",
      image:
        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Brand C",
      category: "Shoes",
      description: "Durable hiking shoes designed for rugged terrains.",
      rating: 4.0,
      numReviews: 8,
      price: 19.99,
      countInStock: 50,
    },
  ];
  

// Insert the products into the database
const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products); // Insert new products
    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
  -0;
};

seedProducts();
