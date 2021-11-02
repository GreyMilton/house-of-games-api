const { fetchCategories } = require('../models/categories.models.js');

function getCategories(req, res, next) {
  fetchCategories().then((response) => {
    res.status(200).send({ categories: response });
  })
  .catch(next);
};

module.exports = { getCategories };

// For controllers Andrea recommends using normal promises