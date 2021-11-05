const Joi = require('joi');

const event = Joi.object()
  .keys({
    event: Joi.string().required(),
  })
  // Authorize any other properties here because this will be verified later
  .unknown(true);

module.exports = {
  event,
};
