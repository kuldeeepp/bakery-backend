import express from 'express';
import { forgotPassword, resetPassword, verifyToken } from '../controller/forgotPasswordController.js';

const router = express.Router();

// Route for requesting a password reset (forgot password)
router.post('/forgot', forgotPassword);

// Route for resetting the password (this is a GET route to display the reset page)
// Route for resetting the password (change from GET to POST)
router.post('/reset-password', resetPassword);


// Route for verifying the token
router.post('/verify-token', verifyToken);

export default router;
