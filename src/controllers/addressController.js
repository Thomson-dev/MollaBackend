import User from '../models/userModel.js'; 
import { errorHandler } from "../utils/error.js";

export const addAddress = async (req, res, next) => {
  const { userId, name, mobileNo, houseNo, street, landmark, city, country, postalCode } = req.body;

  if (!userId || !name || !mobileNo || !houseNo || !street || !city || !country || !postalCode) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    user.addresses.push({
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      city,
      country,
      postalCode,
    });

    await user.save();

    res.status(201).json("Address added successfully");
  } catch (error) {
    next(error);
  }
};