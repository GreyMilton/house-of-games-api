const express = require('express');
const reviewsRouter = express.Router();

const { getReview, patchReview, getReviews, getReviewsComments, postReviewComment } = require('../controllers/reviews.controllers.js');

// reviewsRouter.post('/*', (req, res, next) => {
//   console.log("reviewsRouter!");
//   res.status(200).send({ msg: "Hello, this is your API router, all good here!"});
// })

reviewsRouter.get('/:review_id', getReview);
reviewsRouter.patch('/:review_id', patchReview);
reviewsRouter.get('/', getReviews);
reviewsRouter.get('/:review_id/comments', getReviewsComments);
reviewsRouter.post('/:review_id/comments', postReviewComment);

module.exports = reviewsRouter;