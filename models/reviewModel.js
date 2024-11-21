import mongoose from 'mongoose';

// Define the review schema
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
});

// Create the review model from the schema
const Review = mongoose.model('Review', reviewSchema);

export default Review;
