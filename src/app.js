const cors = require('cors');
const app = require('express')();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const express = require('express');
const { io } = require('./utils/socket');

const cors = require('cors');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/errors');

// TODO GESTION D'ENVS
console.log('ne pas ooublier la gestion d env');

app.use(cors());

io.attach(http);

// parse json request body
app.use(express.json());

app.use(cors())
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// convert error to ApiError, if needed
app.use(errorConverter);

app.use(errorHandler);


module.exports = http;
