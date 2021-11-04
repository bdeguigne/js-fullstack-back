const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
};
