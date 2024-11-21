import Joi from 'joi';

// Joi schema for user login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(8).label("Password")
});



export default loginSchema; // Export loginSchema as default
