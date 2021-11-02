const express = require('express');
const app = express();

const apiRouter = require('./routes/api-routes.js')

app.use('/api', apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found"});
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;