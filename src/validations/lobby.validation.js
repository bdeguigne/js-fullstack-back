const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    playerA: Joi.string().required(),
    playerB: Joi.string().default(null),
    status: Joi.string()
      .valid('NOT_STARTED', 'IN_PROGRESS', 'FINISHED')
      .default('NOT_STARTED'),
  }),
};

const getLobby = {
  params: Joi.object().keys({
    lobbyId: Joi.string().custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    lobbyId: Joi.string().custom(objectId),
  }),
};

const deleteLobby = {
  params: Joi.object().keys({
    lobbyId: Joi.string().custom(objectId),
  }),
};

module.exports = { create, update, getLobby, deleteLobby };
