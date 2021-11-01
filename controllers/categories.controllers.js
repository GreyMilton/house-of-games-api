const { fetchCategories } = require('../models/categories.models.js');

function getCategories(req, res) {
  fetchCategories();
  res.status(200).send();
};

module.exports = { getCategories };

// controllers normal promises