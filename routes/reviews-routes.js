const express = require('express');
const reviewsRouter = express.Router();

const { getReview } = require('../controllers/reviews.controllers.js');

reviewsRouter.get('/:review_id', getReview);

module.exports = reviewsRouter;