const { modelDeleteComment } = require('../models/comments.models.js');

function controllerDeleteComment (req, res, next) {
  const commentId = req.params.comment_id
  modelDeleteComment(commentId).then((response) => {
    res.status(204).send();
  })
  .catch(next);
}

module.exports = { controllerDeleteComment };