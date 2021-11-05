const express = require('express');
const app = express();

const apiRouter = require('./routes/api-routes.js')

app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send({msg: "Hello and welcome to Grey's House of Games API"});
})

app.use('/api', apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found"});
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
})

app.use((err, req, res, next) => {
  if (err.code = '22P02') {
    res.status(400).send({ msg: "Invalid query" });
  } else {
    next(err);
  }
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;