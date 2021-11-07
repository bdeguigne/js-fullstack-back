const Server = require('socket.io');
const { validateSocketMessage } = require('../middlewares/validate');
const subscriptions = require('../socket');

const io = Server();

const api = {
  emit: (event, data) => {
    io.sockets.emit(event, data);
  },
  join: (room) => {
    io.sockets.join(room);
  },
  to: (to, event, data) => {
    io.sockets.to(to).emit(event, data);
  },
};

io.on('connection', (socket) => {
  subscriptions.forEach((subscription) => {
    socket.on(
      subscription.name,
      validateSocketMessage(subscription.events, socket),
    );
  });
});

exports.api = api;
exports.io = io;
