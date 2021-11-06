const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const Socket = require('../utils/socket');
const socketValidation = require('../validations/socket.validation');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

const emitError = (error) => {
  const errorMessage = error.details
    .map((details) => details.message)
    .join(', ');
  Socket.api.emit('error', {
    errorMessage,
  });
};

/**
 * First verify if the message contains the 'event' property
 *
 * Then loop through each 'events'. Find the appropriate event name and verify the 'validationSchema'
 *
 * If everything is ok, call the controller, emit error in 'error' event otherwise.
 */
const validateSocketMessage = (events, client) => (data) => {
  const { value: socketValue, error: socketError } = Joi.compile(
    socketValidation.event,
  ).validate(data);

  if (socketError) {
    emitError(socketError);
  } else {
    let unknownEvent = true;
    events.forEach((event) => {
      if (event.name === socketValue.event) {
        unknownEvent = false;
        // We need to delete the event property because it was already beeing verified and the other validation schema don't need this
        delete socketValue.event;
        const { value, error } = Joi.compile(event.validationSchema).validate(
          socketValue,
        );

        if (error) {
          emitError(error);
        } else {
          event.controller(value, client);
        }
      }
    });
    if (unknownEvent) {
      Socket.api.emit('error', {
        errorMessage: `unknown event : ${socketValue.event}`,
      });
    }
  }
};

module.exports = {
  validate,
  validateSocketMessage,
};
