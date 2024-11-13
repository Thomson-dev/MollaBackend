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
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Brand A",
    category: "trousers",
    description: "StrideLite Runner offers unmatched comfort and agility for daily runners. Crafted with lightweight materials and a responsive sole, these shoes are perfect for hitting the pavement or the trail, providing you with a seamless and enjoyable running experience.",
    rating: 4.5,
    numReviews: 10,
    price: 29.99,
    countInStock: 100,
  },
  {
    name: "FlexMax Trainer",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Brand A",
    category: "trousers",
    description: "The FlexMax Trainer combines comfort and flexibility, making it ideal for a wide range of fitness activities. Engineered with high-performance materials, it supports agility and enhances stability, whether you're at the gym or on the track.",
    rating: 4.5,
    numReviews: 10,
    price: 29.99,
    countInStock: 100,
  },
  {
    name: "TrailGuard Hiker",
    image: "https://images.unsplash.com/photo-1643308001952-c47d5efbae54?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Brand A",
    category: "Jacket",
    description: "TrailGuard Hiker Jacket is built to brave the elements. With advanced insulation and water-resistant materials, this jacket keeps you warm and dry in cold, wet conditions, making it perfect for outdoor adventures and rugged trails.",
    rating: 4.5,
    numReviews: 10,
    price: 29.99,
    countInStock: 100,
  },
  {
    name: "CitySprint Sneaker",
    image: "https://images.unsplash.com/photo-1580047883831-5db03837b0b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Brand A",
    category: "Jacket",
    description: "Designed for urban explorers, the CitySprint Sneaker combines style and functionality. Its sleek design and cushioned sole provide both comfort and a trendy look, perfect for city walking and casual outings.",
    rating: 4.5,
    numReviews: 10,
    price: 29.99,
    countInStock: 100,
  },
  {
    name: "PeakPro Climber",
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Brand A",
    category: "Shoes",
    description: "PeakPro Climber is designed for those who crave challenging terrains. With its rugged sole and reinforced build, it ensures stability and durability for intense hikes, mountain treks, and climbing adventures.",
    rating: 4.5,
    numReviews: 10,
    price: 29.99,
    countInStock: 100,
  },
  {
    name: "CloudWalk Jogger",
    image: "https://images.pexels.com/photos/21765040/pexels-photo-21765040/free-photo-of-fashionable-woman-standing-in-a-cafe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    brand: "Brand B",
    category: "Shoes",
    description: "Light as a cloud and designed for modern urban lifestyles, the CloudWalk Jogger provides a soft and responsive step. Its stylish design and supportive fit make it ideal for jogging, casual walks, or a day out in the city.",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "EnduraTrail Walker",
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Brand C",
    category: "Shoes",
    description: "The EnduraTrail Walker is built to withstand tough terrains and long hikes. With a sturdy design and cushioned support, it ensures a comfortable and durable experience on any trail, making it an ideal companion for adventurous hikers.",
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
