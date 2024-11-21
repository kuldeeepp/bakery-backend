import express from 'express';
import { getAllReviews, addReview } from '../controller/reviewController.js';

const router = express.Router();

// Route to get all reviews
router.get('/', getAllReviews);

// Route to add a new review
router.post('/', addReview);

export default router;
