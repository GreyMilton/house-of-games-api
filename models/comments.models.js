const db = require('../db/connection.js');


function modelDeleteComment (id) {
  console.log("in the delete comment model!");

  const queryStr = `
  DELETE FROM comments
  WHERE comment_id = $1
  ;`;

  const fakeQueryStr = `
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *
  ;`;

  return db.query(fakeQueryStr, [id])
  .then((response) => {
    console.log(response.rows);
    return response.rows[0];
  })
}

module.exports = { modelDeleteComment }