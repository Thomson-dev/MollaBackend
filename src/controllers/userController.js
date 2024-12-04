import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
  const { email, password } = req.body;

  // Check if email or password is missing or empty
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
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
      { expiresIn: "5d" }
    );

    // Destructure the password out of the user object to exclude it from the response
    const { password: pass, ...rest } = validUser._doc;

    res.status(200).json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === "") {
    return next(errorHandler(400, "Email is required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tomsinonyedikachi@gmail.com",
        pass: "agldhsfjhdcoidgr",
      },
    });

    const mailOptions = {
      from: "FASTGAK <no-reply@fastgak.com>",
      to: email,
      subject: "Password Reset OTP Code",
      html: `
        <p>Dear User,</p>
        <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to reset your password:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
        <p>Best regards,</p>
        <p>The FASTGAK Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    next(error);
  }
};

export const verifyOtpAndResetPassword = async (req, res, next) => {
  const { email, otp, Password } = req.body;

  if (
    !email ||
    !otp ||
    !Password ||
    email === "" ||
    otp === "" ||
    Password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (user.otp !== otp || user.otpExpiration < new Date()) {
      return next(errorHandler(400, "Invalid or expired OTP"));
    }

    const hashedPassword = bcryptjs.hashSync(Password, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

// Export the google function so it can be used in other files
// export const google = async (req, res, next) => {
//   // Destructure email, name, and googlePhotoUrl from the request body
//   const { email, name, googlePhotoUrl } = req.body;

//   try {
//     // Find a user with the provided email
//     const user = await User.findOne({ email });
//     if (user) {
//       // If the user exists, generate a JWT token with the user's ID and isAdmin status
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       // Destructure the password out of the user object to exclude it from the response
//       const { password, ...rest } = user._doc;

//       res.status(200).json({ ...rest, token });
//     } else {
//       // If the user does not exist, generate a random password
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);

//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

//       const newUser = new User({
//         username:
//           name.toLowerCase().split(" ").join("") +
//           Math.random().toString(9).slice(-4),
//         email,
//         password: hashedPassword,
//         profilePicture: googlePhotoUrl,
//       });

//       await newUser.save();

//       // Generate a JWT token with the new user's ID and isAdmin status
//       const token = jwt.sign(
//         { id: user._id, isAdmin: user.isAdmin },
//         process.env.JWT_SECRET
//       );

//       const { password, ...rest } = newUser._doc;

//       res.status(200).json({ ...rest, token });
//     }
//   } catch (error) {
//     // If an error occurs, pass the error to the next middleware
//     next(error);
//   }
// };

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving the user profile", error);
    next(errorHandler(500, "Error retrieving the user profile"));
  }
};



export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if the new email already exists in the database
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return next(errorHandler(400, "Email already in use"));
      }
    }

    // Check if the new username already exists in the database
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return next(errorHandler(400, "Username already in use"));
      }
    }

    // Prepare the fields to update
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) updates.password = bcryptjs.hashSync(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    // Generate a new token after updating the user
    const token = jwt.sign(
      {
        id: updatedUser._id,
      },
      process.env.JWT_SECRET, // Make sure to replace this with your secret key
      { expiresIn: "1h" }
    );

    // Destructure the password out of the updated user object to exclude it from the response
    const { password: pass, ...rest } = updatedUser._doc;

    // Send the updated user details, including the token
    res.status(200).json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};
