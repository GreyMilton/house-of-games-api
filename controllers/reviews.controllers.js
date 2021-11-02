const { fetchReview } = require('../models/reviews.models.js');

function getReview(req, res, next) {
  fetchReview(req.params.review_id).then((response) => {
    res.status(200).send({ review: response });
  })
  .catch(next);
};

module.exports = { getReview };