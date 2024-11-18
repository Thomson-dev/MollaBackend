import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js"; 
import User from "../models/userModel.js"; 

// Export the verifyToken function so it can be used as middleware in other files
export const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and exclude the password field
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return next(errorHandler(401, "Unauthorized: User not found"));
      }

      next(); 
    } catch (err) {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }
  } else {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }
};