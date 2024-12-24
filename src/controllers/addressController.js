import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const addAddress = async (req, res, next) => {
  const {
    userId,
    name,
    mobileNo,
    houseNo,
    street,
    landmark,
    city,
    country,
    postalCode,
  } = req.body;

  if (
    !userId ||
    !name ||
    !mobileNo ||
    !houseNo ||
    !street ||
    !city ||
    !country ||
    !postalCode
  ) {
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

export const getAddresses = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const addresses = user.addresses;

    res.status(201).json(addresses);
  } catch (error) {
    next(error);
  }
};


export const deleteAddress = async (req, res, next) => {
  const addressId = req.params.addressId;

  try {
    // Find the user who has the address with the given address ID
    const user = await User.findOne({ 'addresses._id': addressId });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const addressIndex = user.addresses.findIndex(address => address._id.toString() === addressId);

    if (addressIndex === -1) {
      return next(errorHandler(404, "Address not found"));
    }

    user.addresses.splice(addressIndex, 1);
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    next(error);
  }
};