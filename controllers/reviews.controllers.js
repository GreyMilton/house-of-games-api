const { fetchReview, updateReview, fetchReviews } = require('../models/reviews.models.js');

function getReview(req, res, next) {
  const reviewId = req.params.review_id
  fetchReview(reviewId).then((response) => {
    res.status(200).send({ review: response });
  })
  .catch(next);
};

function patchReview(req, res, next) {
  let newValue = req.body.inc_votes;
  if (typeof newValue === 'string') {
    newValue = Number(newValue);
  }
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "Incomplete request" });
  } else if (!newValue || newValue === true || Object.keys(req.body).length > 1) {
    res.status(400).send({ msg: "Invalid request body" });
  } else {
    const reviewId = req.params.review_id;
    updateReview(newValue, reviewId).then((response) => {
      res.status(200).send({ review: response });
    })
    .catch(next);
  }
}

function getReviews(req, res, next) {
  fetchReviews().then((response) => {
    res.status(200).send({ reviews: response });
  })
}

module.exports = { getReview, patchReview, getReviews };