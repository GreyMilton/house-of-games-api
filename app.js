const express = require('express');
const app = express();

const categoryRouter = require('./routes/categories-routes.js');
const commentsRouter = require('./routes/comments-routes.js');
const reviewsRouter = require('./routes/reviews-routes.js');
const usersRouter = require('./routes/users-routes.js');

app.use('/api/categories', categoryRouter);
app.use('/api/comments', categoryRouter);
app.use('/api/reviews', categoryRouter);
app.use('/api/users', categoryRouter);

module.exports = app;