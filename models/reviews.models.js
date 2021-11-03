const db = require('../db/connection.js');


function fetchReview(id) {
  // my old two query version:

  // let queryStr = `SELECT * FROM reviews WHERE review_id = $1`
  // return db.query(queryStr, [id])
  // .then((response) => {
  //   let queryStr2 = `SELECT COUNT(review_id) AS comment_count
  //   FROM comments WHERE review_id = $1;`
  //   return Promise.all([response.rows[0], db.query(queryStr2, [id])])
  // })
  // .then((response) => {
  //   const review = response[0];
  //   review.comment_count = Number(response[1].rows[0].comment_count);
  //   return review;
  // })

  // my current version using one query:
  let queryStr = `
    SELECT reviews.*, COUNT(comment_id) ::INT AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;`;
  return db.query(queryStr, [id])
  .then((response) => {
    return response.rows[0];
  })

};

module.exports = { fetchReview };