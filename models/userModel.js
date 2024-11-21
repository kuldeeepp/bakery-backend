// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no two users can have the same email
    lowercase: true, // Normalize email to lowercase
  },
  password: {
    type: String,
    required: true,
  },
  // Add any other fields as needed (e.g., name, role, etc.)
});

const User = mongoose.model('User', userSchema); 

export default User;
