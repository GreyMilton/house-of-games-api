const express = require('express');
const reviewsRouter = express.Router();

const { getReview, patchReview, getReviews } = require('../controllers/reviews.controllers.js');

reviewsRouter.get('/:review_id', getReview);
reviewsRouter.patch('/:review_id', patchReview);
reviewsRouter.get('/', getReviews)

module.exports = reviewsRouter;