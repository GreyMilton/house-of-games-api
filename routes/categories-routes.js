const express = require('express');
const categoryRouter = express.Router();

const { getCategories } = require('../controllers/categories.controllers.js');

categoryRouter.get('/', getCategories);

module.exports = categoryRouter;