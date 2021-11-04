const app = require('./app.js');

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log(`Listening for requests to games database on port ${PORT}...`);
})