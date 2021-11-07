const express = require('express');
const commentsRouter = express.Router();

const { controllerDeleteComment } = require('../controllers/comments.controllers.js');

commentsRouter.delete('/:comment_id', controllerDeleteComment);

module.exports = commentsRouter;