const Joi = require('joi');

const joinLobby = {
  event: Joi.string().required(),
};

module.exports = {
  joinLobby,
};
