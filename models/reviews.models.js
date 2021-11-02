const db = require('../db/connection.js');


function fetchReview(id) {
  return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [id])
  .then((response) => {
    console.log(response.rows[0]);
    return response.rows[0];
  });
};

module.exports = { fetchReview };