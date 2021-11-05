const gameValidation = require('../validations/gameEvent.validation');
const lobbyValidation = require('../validations/lobbyEvent.validation');
const gameController = require('../controllers/gameEvent.controller');
const lobbyController = require('../controllers/lobbyEvent.controller');

const subscriptions = [
  {
    name: 'lobby',
    events: [
      {
        name: 'join',
        validationSchema: lobbyValidation.join,
        controller: lobbyController.join,
      },
      {
        name: 'play',
        validationSchema: lobbyValidation.play,
        controller: lobbyController.play,
      },
      {
        name: 'leave',
        validationSchema: lobbyValidation.leave,
        controller: lobbyController.leave,
      },
    ],
  },
  {
    name: 'game',
    events: [
      {
        name: 'connect',
        validationSchema: gameValidation.connect,
        controller: gameController.connect,
      },
      {
        name: 'next',
        validationSchema: gameValidation.next,
        controller: gameController.next,
      },
      {
        name: 'playerWins',
        validationSchema: gameValidation.playerWins,
        controller: gameController.playerWins,
      },
    ],
  },
];

module.exports = subscriptions;
