const Joi = require('joi');

const join = {
  playerName: Joi.string().required(),
  roomId: Joi.string().required(),
};

const play = {
  roomId: Joi.string().required(),
};

const leave = {
  roomId: Joi.string().required(),
};

module.exports = {
  join,
  play,
  leave,
};
