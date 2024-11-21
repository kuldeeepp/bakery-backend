import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';


const signupSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
    maxlength: [30, "First name must have less or equal than 30 characters"],
    minlength: [3, "First name must have more or equal than 3 characters"],
  },
  last: {
    type: String,
    required: true,
    maxlength: [30, "Last name must have less or equal than 30 characters"],
    minlength: [3, "Last name must have more or equal than 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

signupSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWTKEY,{expiresIn:"7d"})
  return token;
}

export const Signup = mongoose.model("user",signupSchema);





