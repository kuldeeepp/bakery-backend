// controllers/authController.js
import {Signup} from "../models/signup.js"; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/emailSender.js';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await Signup.findOne({ email });

    // Ensure the user exists before proceeding
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const firstName = user.first.toUpperCase();

    // Create a password reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resetLink = `${process.env.FRONTEND_URL.replace(/\/$/, '')}/reset-password/${resetToken}`;

    // Customize the email content
    const emailContent = `
      <p>Hello ${firstName}, 
      We received a request to reset your password for your account associated with this email address.
      If you didn't make this request, please ignore this email. To reset your password, click the link below (this link will expire in 1 hour):
      <a href="${resetLink}">Reset your password</a> 
      If you have any issues or didn't request this, please contact our support team. 
      Best regards, 
      Dwija Bake Studio Team</p>
    `;

    // Send email (ensure sendEmail function supports HTML)
    await sendEmail(user.email, 'Password Reset Request', emailContent);

    // Respond with success message
    res.status(200).json({ message: 'Password reset link has been sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Backend (forgotPasswordController.js)
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use process.env.JWT_SECRET

    // Find the user by ID
    const user = await Signup.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (err) {
    console.error('Error resetting password:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// In your backend controller (forgotPasswordController.js)

export const verifyToken = async (req, res) => {
  const { token } = req.body;
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
