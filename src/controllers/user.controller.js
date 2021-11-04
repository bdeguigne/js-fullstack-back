const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
// const ApiError = require('../utils/ApiError');

const getUser = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send('');
});

const createUser = catchAsync(async (req, res) => {
  // Example gestion d'erreur :
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  res.status(httpStatus.CREATED).send('');
});

module.exports = {
  getUser,
  createUser,
};
