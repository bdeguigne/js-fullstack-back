const app = require('express')();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const express = require('express');
const { io } = require('./utils/socket');

const cors = require('cors');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/errors');

io.attach(http);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// convert error to ApiError, if needed
app.use(errorConverter);

app.use(errorHandler);

app.use(cors());
app.options('*', cors());

module.exports = http;
