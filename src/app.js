const express = require('express');

const app = express();

const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/errors');

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// convert error to ApiError, if needed
app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
