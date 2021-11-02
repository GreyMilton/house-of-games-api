const db = require('../db/connection.js');


function fetchReview(id) {
  // I need to rewrite this queryStr so that it:
  // Selects the full row from review table that matches review_id
  // Counts the amount of comments in the comments table that refer to it (with the matching review_id)
  // Appends a new column name onto the review table row: comment_count (with the count of comments relating that review_id)
  // returns the full row plus appension (is that a word?)

  // I could do all the above... or I could use js to find the count, and do a second query instead

  let queryStr = `SELECT * FROM reviews WHERE review_id = $1`
  return db.query(queryStr, [id])
  .then((response) => {
    let queryStr2 = `SELECT COUNT(review_id) AS comment_count
    FROM comments WHERE review_id = $1;`
    return Promise.all([response.rows[0], db.query(queryStr2, [id])])
  })
  .then((response) => {
    const review = response[0];
    review.comment_count = Number(response[1].rows[0].comment_count);
    return review;
  })
};

module.exports = { fetchReview };