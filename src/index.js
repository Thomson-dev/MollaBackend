import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

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
app.use('/api/user', userRoute);
app.use('/api/product', productRoute );

// Start the server
app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

// Error-handling middleware function
app.use((err, req, res, next) => {
  // Get the status code from the error object, or default to 500 if not provided
  const statusCode = err.statusCode || 500;

  // Get the message from the error object, or default to 'Internal Server Error' if not provided
  const message = err.message || "Internal Server Error";

  // Send a JSON response with the status code and error message
  res.status(statusCode).json({
    success: false, // Indicate that the request was not successful
    statusCode, // Include the status code in the response
    message, // Include the error message in the response
  });
});