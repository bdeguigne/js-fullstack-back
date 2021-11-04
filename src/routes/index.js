const express = require('express');

const router = express.Router();
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
