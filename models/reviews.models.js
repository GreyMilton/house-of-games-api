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

  const queryStr = `
    SELECT reviews.*, COUNT(comment_id) ::INT AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;`;
  return db.query(queryStr, [id])
  .then((response) => {
    if (response.rows.length === 0) {
      return Promise.reject({status: 404, msg: "Review not found" });
    }
    return response.rows[0];
  })

};

function updateReview(newValue, id) {

  const updateStr = `
  UPDATE reviews
  SET votes = votes + $1
  WHERE review_id = $2
  RETURNING *;`;

  return db.query(updateStr, [newValue, id])
  .then((response) => {
    if (response.rows.length === 0) {
      return Promise.reject({status: 404, msg: "Review not found" });
    }
    return response.rows[0]
  })

}

function fetchReviews(query) {
  const queryKeys = Object.keys(query)
  let { sort_by = 'created_at', order = 'DESC', category = false} = query;
  let validKeys = true;

  for (let i = 0; i < queryKeys.length; i++) {
    const key = queryKeys[i];
    if (key !== 'sort_by' && key !== 'order' && key !== 'category') {
      validKeys = false;
    }
  }
  if (validKeys === false) {
    return Promise.reject({ status:400, msg: "Invalid query" });
  }
  if (!['review_id', 'title', 'designer', 'owner', 'review_img_url', 'review_body', 'category', 'created_at',
  'votes'].includes(sort_by)) {
    return Promise.reject({ status:400, msg: "Invalid sort_by query" });
  }
  if (!['ASC', 'DESC', 'asc', 'desc'].includes(order)) {
    return Promise.reject({ status:400, msg: "Invalid order query" });
  }
console.log("are we here?");
console.log("category:", category);

for (let i = 0; i < category.length; i++) {
  if (category[i] === "'") {
    category = category.substring(0, i) + "'" + category.substring(i);
    i++;
  };
  
}
const categoryQuery = `
  SELECT *
  FROM categories
  WHERE slug=\'${category}\';`;
console.log("categoryQuery:", categoryQuery);
  return db.query(categoryQuery)
    .then((response) => {
      console.log(response.rows);
      if (response.rows.length === 0 && category !== false) {
        return Promise.reject({ status:400, msg: "Invalid category query" });
      } else {
        console.log("here we are!");
        const queryStrTop = `
        SELECT reviews.*, COUNT(comment_id) ::INT AS comment_count
        FROM reviews
        LEFT JOIN comments ON comments.review_id = reviews.review_id`;
        const queryStrMid = `
        WHERE reviews.category = \'${category}\'`;
        const queryStrTail = `
        GROUP BY reviews.review_id
        ORDER BY reviews.${sort_by} ${order};`;
        let queryStr;
        if (!category) {
          queryStr = queryStrTop + queryStrTail;
        } else {
          queryStr = queryStrTop + queryStrMid + queryStrTail;
        }
        console.log(queryStr);
        return db.query(queryStr)
      }
    })
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({status: 404, msg: "Reviews not found" });
      }
      return response.rows;
    })

}

function fetchReviewsComments(id) {
  const queryStr = `
    SELECT *
    FROM comments
    WHERE review_id = $1`;
    return db.query(queryStr, [id])
  .then((response) => {
    console.log(response.rows);
    // if (response.rows.length === 0) {
    //   return Promise.reject({status: 404, msg: "Review not found" });
    // }
    return response.rows;
  })

}

module.exports = { fetchReview, updateReview, fetchReviews, fetchReviewsComments };