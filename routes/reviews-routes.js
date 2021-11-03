const express = require('express');
const reviewsRouter = express.Router();

const { getReview, patchReview } = require('../controllers/reviews.controllers.js');

reviewsRouter.get('/:review_id', getReview);
reviewsRouter.patch('/:review_id', patchReview);

module.exports = reviewsRouter;