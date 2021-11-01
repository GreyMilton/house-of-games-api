const express = require('express');
const app = express();

const apiRouter = require('./routes/api-routes.js')

app.use('/api', apiRouter);

app.use("/*", (req, res, next) => {

})

module.exports = app;