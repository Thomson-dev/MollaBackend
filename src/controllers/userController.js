import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Export the signup function so it can be used in other files
export const signup = async (req, res, next) => {
  // Destructure username, email, and password from the request body
  const { username, email, password } = req.body;

  // Check if any of the required fields are missing or empty
  if (
    !username || 
    !email || 
    !password || 
    username === "" || 
    email === "" || 
    password === "" 
  ) {
    // If any field is missing or empty, call the errorHandler with a 400 status code and an error message
    next(errorHandler(400, "All fields are required"));
    return; // Exit the function to prevent further execution
  }

  // Hash the password using bcryptjs with a salt rounds value of 10
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user object with the provided username, email, and hashed password
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // Attempt to save the new user to the database
    await newUser.save();
    // If successful, send a JSON response indicating signup was successful
    res.json("Signup successful");
  } catch (error) {
    // If an error occurs during saving, pass the error to the next middleware
    next(error);
  }
};


export const signin = async (req, res, next) => {
  // Destructure email and password from the request body
  const { email, password  } = req.body;

  // Check if email or password is missing or empty
  if (!email || !password  || email === "" || password === "") {
   
     return  next(errorHandler(400, "All fields are required"));
           
  }

  try {
    // Find a user with the provided email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      // If no user is found, call the errorHandler with a 404 status code and an error message
      return next(errorHandler(404, "User not found"));
    }

    // Compare the provided password with the stored hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      // If the password is invalid, call the errorHandler with a 400 status code and an error message
      return next(errorHandler(400, "Invalid password"));
    }

    // Generate a JWT token with the user's ID and isAdmin status
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  
    // Destructure the password out of the user object to exclude it from the response
    const { password: pass, ...rest } = validUser._doc;
    
    res.status(200).json({ ...rest, token });
   
  } catch (error) {
   
    next(error);
  }
};
