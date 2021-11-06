const Joi = require('joi');

const start = {
  roomId: Joi.string().required(),
};

const next = {
  playerName: Joi.string().required(),
  roomId: Joi.string().required(),
};

const playerWins = {
  playerName: Joi.string().required(),
  roomId: Joi.string().required(),
};

module.exports = {
  start,
  next,
  playerWins,
};
