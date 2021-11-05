const Server = require('socket.io');
const { validateSocket } = require('../middlewares/validate');
const { joinLobby } = require('../validations/game.validation');
const gameController = require('../controllers/game.controller');

const io = Server();

const api = {
  emit: (event, data) => {
    console.log('EMIT', event, data);
    io.sockets.emit(event, data);
  },
  join: (room) => {
    console.log('join');
    io.sockets.join(room);
  },
};

io.on('connection', (socket) => {
  console.log('A user connected', socket.client.id);

  socket.on('lobby', validateSocket(joinLobby, gameController.joinLobby));
});

exports.api = api;
exports.io = io;
