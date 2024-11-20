import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import { createPaymentIntent } from "./controllers/stripeController.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Use the user routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/address", addressRoute);
app.post("/api/stripe/intents", createPaymentIntent);
app.use("/api/orders", orderRoute);

// Start the server
app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

// Error-handling middleware function
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
