const db = require('../db/connection.js');


function modelDeleteComment (id) {
  console.log("in the delete comment model!");

  const queryStr = `
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *
  ;`;
  return db.query(queryStr, [id])
  .then((response) => {
    console.log(response.rows);
    if (response.rows.length === 0) {
      return Promise.reject({status: 404, msg: "Comment not found" });
    }
    return response.rows[0];
  })
}

module.exports = { modelDeleteComment }