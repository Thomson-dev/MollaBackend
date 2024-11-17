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
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Brand A",
    category: "clothing and accessories",
    description:
      "StrideLite Runner offers unmatched comfort and agility for daily runners. Crafted with lightweight materials and a responsive sole, these shoes are perfect for hitting the pavement or the trail, providing you with a seamless and enjoyable running experience.",
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
    category: "clothing and accessories",
    description:
      "The FlexMax Trainer combines comfort and flexibility, making it ideal for a wide range of fitness activities. Engineered with high-performance materials, it supports agility and enhances stability, whether you're at the gym or on the track.",
    rating: 4.5,
    numReviews: 10,
    price: 29.99,
    countInStock: 100,
  },
  {
    name: "TrailGuard Hiker",
    image:
      "https://images.unsplash.com/photo-1643308001952-c47d5efbae54?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Brand A",
    category: "clothing and accessories",
    description:
      "TrailGuard Hiker Jacket is built to brave the elements. With advanced insulation and water-resistant materials, this jacket keeps you warm and dry in cold, wet conditions, making it perfect for outdoor adventures and rugged trails.",
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
    category: "clothing and accessories",
    description:
      "Designed for urban explorers, the CitySprint Sneaker combines style and functionality. Its sleek design and cushioned sole provide both comfort and a trendy look, perfect for city walking and casual outings.",
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
    category: "clothing and accessories",
    description:
      "PeakPro Climber is designed for those who crave challenging terrains. With its rugged sole and reinforced build, it ensures stability and durability for intense hikes, mountain treks, and climbing adventures.",
    rating: 4.5,
    numReviews: 10,
    price: 29.99,
    countInStock: 100,
  },
  {
    name: "CloudWalk Jogger",
    image:
      "https://images.pexels.com/photos/21765040/pexels-photo-21765040/free-photo-of-fashionable-woman-standing-in-a-cafe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    brand: "Brand B",
    category: "clothing and accessories",
    description:
      "Light as a cloud and designed for modern urban lifestyles, the CloudWalk Jogger provides a soft and responsive step. Its stylish design and supportive fit make it ideal for jogging, casual walks, or a day out in the city.",
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
    category: "clothing and accessories",
    description:
      "The EnduraTrail Walker is built to withstand tough terrains and long hikes. With a sturdy design and cushioned support, it ensures a comfortable and durable experience on any trail, making it an ideal companion for adventurous hikers.",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },

  {
    name: "HydraGlow Moisturizer",
    category: "Skincare",
    price: 25.0,
    brand: "Brand A",
    description:
      "Lightweight, hydrating moisturizer with hyaluronic acid and aloe vera.",
    image:
      "https://images.pexels.com/photos/17656720/pexels-photo-17656720/free-photo-of-close-up-of-cosmetics.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Deep Clean Foaming Face Wash",
    category: "Skincare",
    price: 15.0,
    brand: "Brand A",
    description:
      "Gentle, foaming face wash that removes impurities and refreshes the skin.",
    image:
      "https://images.pexels.com/photos/7795789/pexels-photo-7795789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Silk & Shine Shampoo",
    category: "Hair Care",
    brand: "Brand A",
    price: 18.0,
    description: "Smoothing shampoo with keratin for frizz-free, shiny hair.",
    image: "silk-shine-shampoo.jpg",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Volume Boost Conditioner",
    category: "Hair Care",
    price: 20.0,
    brand: "Brand A",
    description:
      "Lightweight conditioner that adds body and fullness for fine hair.",
    image:
      "https://images.pexels.com/photos/13573919/pexels-photo-13573919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Matte Perfection Foundation",
    category: "Makeup",
    price: 28.0,
    brand: "Brand A",
    description:
    
      "Full-coverage foundation with a matte finish, available in 10 shades.",
    image:
      "https://images.pexels.com/photos/8981524/pexels-photo-8981524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Luxe Lip Color",
    category: "Makeup",
    brand: "Brand A",
    price: 12.0,
    description:
      "Creamy, long-lasting lipstick in rich shades for every skin tone.",
    image:
      "https://images.pexels.com/photos/2517881/pexels-photo-2517881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Blooming Garden Perfume",
    category: "Fragrance",
    price: 40.0,
    description: "A fresh, floral fragrance with notes of jasmine and rose.",
    image: "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    brand: "Brand A",
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Citrus Breeze Body Mist",
    category: "Fragrance",
    brand: "Brand A",
    price: 15.0,
    description: "Refreshing body mist with a hint of lemon and orange zest.",
    image: "https://www.pexels.com/photo/clear-glass-perfume-bottle-with-pink-jade-roller-4938265/",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  

  {
    name: "Smart Fitness Watch",
    category: "Gadgets",
    brand: "Brand A",
    price: 99.0,
    description:
      "Multifunctional fitness watch with heart rate monitor, GPS, and step tracking.",
    image: "https://images.pexels.com/photos/437036/pexels-photo-437036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Wireless Bluetooth Earbuds",
    brand: "Brand A",
    category: "Gadgets",
    price: 45.0,
    description:
      "High-quality sound and noise-canceling Bluetooth earbuds with charging case.",
    image: "https://images.pexels.com/photos/10029870/pexels-photo-10029870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Portable Power Bank",
    category: "Gadgets",
    brand: "Brand A",
    price: 25.0,
    description:
      "10,000mAh portable charger with dual USB output for charging on the go.",
    image: "https://images.pexels.com/photos/10104320/pexels-photo-10104320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "HD Action Camera",
    brand: "Brand A",
    category: "Gadgets",
    price: 75.0,
    description:
      "Waterproof HD action camera with wide-angle lens and video recording capabilities.",
    image: "https://images.pexels.com/photos/952264/pexels-photo-952264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    numReviews: 8,
    price: 19.99,
    countInStock: 50,
  },
  {
    name: "Smart Home Speaker",
    category: "Gadgets",
    brand: "Brand A",
    price: 60.0,
    description:
      "Voice-activated smart speaker compatible with home automation systems.",
    image: "https://images.pexels.com/photos/27662902/pexels-photo-27662902/free-photo-of-smart-home-devices-empty-smartphone-screen-mockup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
