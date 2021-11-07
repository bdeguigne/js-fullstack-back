const Socket = require('../utils/socket');
const cache = require('../utils/cache');
const { shuffle, splitDeck, nextMove } = require('../utils/game');

const join = (message, client) => {
  const { roomId } = message;

  client.join(roomId);

  // Store players in cache with roomId as key
  const room = cache.get(roomId);
  if (room === undefined) {
    // first player joined
    cache.set(roomId, {
      playerA: {
        name: message.playerName,
        deck: [],
        points: 0,
      },
    });
    Socket.api.to(roomId, 'lobby', {
      event: 'join',
      playerA: message.playerName,
      playerB: null,
      ready: false,
    });
  } else {
    // player B joined
    cache.set(roomId, {
      ...room,
      playerB: {
        name: message.playerName,
        deck: [],
        points: 0,
      },
    });
    Socket.api.to(roomId, 'lobby', {
      event: 'join',
      playerA: room.playerA.name,
      playerB: message.playerName,
      ready: true,
    });
  }
};

const play = (message) => {
  const deck = shuffle();
  const { playerADeck, playerBDeck } = splitDeck(deck);

  const room = cache.get(message.roomId);

  room.playerA.deck = playerADeck;
  room.playerB.deck = playerBDeck;

  const playerTurn = room.playerA.name;

  const { card: movePlayerACard } = nextMove(
    JSON.parse(JSON.stringify(room.playerA)),
  );

  const { card: movePlayerBCard } = nextMove(
    JSON.parse(JSON.stringify(room.playerB)),
  );

  cache.set(message.roomId, {
    ...room,
    playerTurn,
  });

  Socket.api.to(message.roomId, 'game', {
    event: 'play',
    playerA: {
      username: room.playerA.name,
      card: movePlayerACard,
    },
    playerB: {
      username: room.playerB.name,
      card: movePlayerBCard,
    },
  });
};

module.exports = {
  join,
  play,
};
