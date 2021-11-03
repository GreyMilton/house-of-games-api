const { fetchReview, updateReview } = require('../models/reviews.models.js');

function getReview(req, res, next) {
  const reviewId = req.params.review_id
  fetchReview(reviewId).then((response) => {
    res.status(200).send({ review: response });
  })
  .catch(next);
};

function patchReview(req, res, next) {
  const reviewId = req.params.review_id;
  const newValue = req.body.inc_votes;
  console.log(newValue);
  updateReview(reviewId, newValue);
}

module.exports = { getReview, patchReview };