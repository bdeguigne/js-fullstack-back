const express = require('express');

const router = express.Router();
const { validate } = require('../middlewares/validate');
const lobbyController = require('../controllers/lobby.controller');
const lobbyValidation = require('../validations/lobby.validation');

router
  .route('/')
  .get(lobbyController.getAllLobby)
  .post(validate(lobbyValidation.create), lobbyController.create);

router
  .route('/:lobbyId')
  .get(validate(lobbyValidation.getLobby), lobbyController.getLobby)
  .patch(validate(lobbyValidation.update), lobbyController.update)
  .delete(validate(lobbyValidation.deleteLobby), lobbyController.deleteLobby);

module.exports = router;
