const Joi = require('joi');

const connect = {
  playerId: Joi.string().required(),
  roomId: Joi.string().required(),
};

const next = {
  playerId: Joi.string().required(),
  roomId: Joi.string().required(),
};

const playerWins = {
  playerId: Joi.string().required(),
  roomId: Joi.string().required(),
};

module.exports = {
  connect,
  next,
  playerWins,
};
