const express = require('express');
const app = require('../app.js');
const apiRouter = express.Router();

const categoryRouter = require('./categories-routes.js');
const commentsRouter = require('./comments-routes.js');
const reviewsRouter = require('./reviews-routes.js');
const usersRouter = require('./users-routes.js');

apiRouter.get('/', (req, res, next) => {
})

apiRouter.use('/categories', categoryRouter);
apiRouter.use('/comments', categoryRouter);
apiRouter.use('/reviews', categoryRouter);
apiRouter.use('/users', categoryRouter);

module.exports = apiRouter;