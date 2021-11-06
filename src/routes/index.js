const express = require('express');

const router = express.Router();
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const lobbyRoute = require('./lobby.route');

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/lobby',
    route: lobbyRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
