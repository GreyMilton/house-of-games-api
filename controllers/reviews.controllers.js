const { fetchReview, updateReview } = require('../models/reviews.models.js');

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
    console.log(newValue, "<--- initial newValue");
    newValue = Number(newValue);
    console.log(newValue, "<--- newValue as a number");
  }

  console.log(Number(newValue), typeof Number(newValue));
  if (!newValue || newValue === true || Object.keys(req.body).length !== 1) {
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