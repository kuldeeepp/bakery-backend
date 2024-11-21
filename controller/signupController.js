import { Signup } from "../models/signup.js";
import bcrypt from "bcryptjs";
import ErrorHandler from "../error/error.js";
import { sendEmail } from "../utils/emailSender.js"; // Import the email sending function

// Function to handle user signup and send welcome email
export const sendUser = async (req, res, next) => {
  const { first, last, email, password } = req.body;

  try {
    // Check if all required fields are provided
    if (!first || !last || !email || !password) {
      throw new ErrorHandler("Please fill all the details of the signup form", 400);
    }

    // Validate password length
    if (password.length < 8) {
      throw new ErrorHandler("Password must be at least 8 characters long", 400);
    }

    // Check if user with the same email already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with given email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await Signup.create({
      first,
      last,
      email,
      password: hashedPassword,
    });

    // Send welcome email to the new user
    const emailSubject = "Welcome to Dwija Bake Studio!";
    const uppercasedFirst = first.toUpperCase();
    const uppercasedLast = last.toUpperCase();
    
    const emailMessage = `Hello ${uppercasedFirst} ${uppercasedLast},\n
    
    Welcome to Dwija Bake Studio! 
    We're thrilled to have you join us. Get ready to embark on a culinary journey filled with delicious flavors and delightful dishes.
    Thank you for signing up and choosing to explore our menu. We can't wait to serve you!\n
    Best regards,
    Dwija Bake Studio Team`;
    

    await sendEmail(email, emailSubject, emailMessage);

    res.status(201).json({
      success: true,
      message: "Signup successful! Welcome email sent.",
      user: {
        _id: newUser._id,
        first: newUser.first,
        last: newUser.last,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};
