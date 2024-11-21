import { Signup } from "../models/signup.js"; // Import the Signup model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import loginSchema from "../models/login.js"; // Import the loginSchema for validation
import ErrorHandler from "../error/error.js";

// Function to handle user login
export const loginUser = async (req, res, next) => {
  try {
    // Validate user input
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(error.details[0].message, 400);
    }

    // Destructure user credentials from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await Signup.findOne({ email });
    if (!user) {
      throw new ErrorHandler("Incorrect email address.", 401); // More specific error message for incorrect email
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ErrorHandler("Incorrect password.", 401); // More specific error message for incorrect password
    }

    // Generate JWT token with user ID, token expires in 7 days (you can adjust this if needed)
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      userDetails: {
        firstName: user.first,  // Include user details as per your requirement
        lastName: user.last,
        email: user.email
      }
    });
  } catch (error) {
    // Handle validation error separately if it's from the schema
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    // Pass other errors to the error handler
    return next(error);
  }
};
