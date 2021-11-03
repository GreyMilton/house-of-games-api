const { fetchReview } = require('../models/reviews.models.js');

function getReview(req, res, next) {
  const review_id = req.params.review_id
  fetchReview(review_id).then((response) => {
    res.status(200).send({ review: response });
  })
  .catch(next);
};

module.exports = { getReview };