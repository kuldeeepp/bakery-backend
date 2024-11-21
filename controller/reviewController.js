import Review from '../models/reviewModel.js';
import { sendEmail } from "../utils/emailSender.js";

// Controller to get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to add a new review
const addReview = async (req, res) => {
  const { name, content, rating, email } = req.body;

  // Validation
  if (!name || !content || !rating || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new review
    const newReview = new Review({ name, content, rating });
    await newReview.save();

    // Customize the email content
    const emailContent = `
      <p>Dear ${name.toUpperCase()},
      Thank you for taking the time to submit a review. We appreciate your feedback and value your opinion.
      Your review:
      Rating: ${rating} stars
      Content: ${content}
      We are constantly working to improve, and your review helps us provide better service to you and other customers.
      Best regards,
      Dwija Bake Studio Team</p>
    `;

    // Send the thank-you email
    await sendEmail(email, 'Thank You for Your Review!', emailContent);

    // Respond with success message
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getAllReviews,
  addReview,
};
