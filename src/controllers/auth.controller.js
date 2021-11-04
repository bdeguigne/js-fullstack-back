const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
// const ApiError = require('../utils/ApiError');
const userService = require('../services/user.service');
const authService = require('../services/auth.service');

const register = catchAsync(async (req, res) => {
  const users = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(users);
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginWithUsernameAndPassword(
    username,
    password,
  );
  res.send(user);
});

module.exports = {
  register,
  login,
};
