const db = require('../db/connection.js');


function fetchCategories() {
  return db.query(`SELECT * FROM categories`)
  .then((response) => {
    return response.rows;
  });
};

module.exports = { fetchCategories };



// Andrea suggested to use async / await in models