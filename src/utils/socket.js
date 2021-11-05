const Server = require('socket.io');
const { validateSocketMessage } = require('../middlewares/validate');
const subscriptions = require('../socket');

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

  subscriptions.forEach((subscription) => {
    socket.on(subscription.name, validateSocketMessage(subscription.events));
  });
});

exports.api = api;
exports.io = io;
