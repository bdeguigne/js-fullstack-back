const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');

const loginWithUsernameAndPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

module.exports = {
  loginWithUsernameAndPassword,
};
