const express = require('express');
const app = require('../app.js');
const apiRouter = express.Router();

const categoryRouter = require('./categories-routes.js');
const commentsRouter = require('./comments-routes.js');
const reviewsRouter = require('./reviews-routes.js');
const usersRouter = require('./users-routes.js');

apiRouter.get('/', (req, res, next) => {
  res.status(200).send({ msg: "Hello, this is your API router, all good here!"});
})

apiRouter.use('/categories', categoryRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;