const { fetchReview, updateReview, fetchReviews, fetchReviewsComments, insertReviewComment } = require('../models/reviews.models.js');

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
  fetchReviews(req.query).then((response) => {
    res.status(200).send({ reviews: response });
  })
  .catch(next);
}

function getReviewsComments(req, res, next) {
  const reviewId = req.params.review_id;
  fetchReviewsComments(reviewId).then((response) => {
    res.status(200).send({ comments: response });
  })
  .catch(next);
}

function postReviewComment(req, res, next) {
  console.log("into the controller!");

  const { username, body } = req.body;
  // if (typeof newValue === 'string') {
  //   newValue = Number(newValue);
  // }
  if (Object.keys(req.body).length === 0) {
    console.log("into the first if");
    res.status(400).send({ msg: "Incomplete request" });
  } else if (!username || username === true || !body || body === true || Object.keys(req.body).length !== 2) {
    res.status(400).send({ msg: "Invalid request body" });
  } else {





  
  const reviewId = req.params.review_id;

  console.log(req.body);


  
  insertReviewComment(username, body, reviewId).then((response) => {
    console.log("back into the controller!");
    res.status(201).send({ comment: response });
  })
  .catch(next);
}
}

module.exports = { getReview, patchReview, getReviews, getReviewsComments, postReviewComment };