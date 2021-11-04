const { fetchReview, updateReview } = require('../models/reviews.models.js');

function getReview(req, res, next) {
  const reviewId = req.params.review_id
  fetchReview(reviewId).then((response) => {
    res.status(200).send({ review: response });
  })
  .catch(next);
};

function patchReview(req, res, next) {
  const newValue = req.body.inc_votes;
  if (newValue === undefined || Object.keys(req.body).length !== 1) {
    res.status(400).send({ msg: "Invalid request body"});
  } else {
    const reviewId = req.params.review_id;
    updateReview(newValue, reviewId).then((response) => {
      res.status(200).send({ review: response });
    })
    .catch(next);
  }
}

module.exports = { getReview, patchReview };