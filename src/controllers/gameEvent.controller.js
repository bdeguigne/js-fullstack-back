const cache = require('../utils/cache');
const { shuffle, splitDeck, nextMove } = require('../utils/game');
const Socket = require('../utils/socket');

const start = (message) => {
  console.log('receive start message ', message);
  const deck = shuffle();
  const { playerADeck, playerBDeck } = splitDeck(deck);

  const room = cache.get(message.roomId);

  room.playerA.deck = playerADeck;
  room.playerB.deck = playerBDeck;

  const playerTurn = room.playerA.name;

  cache.set(message.roomId, { ...room, playerTurn });

  Socket.api.to(message.roomId, 'game', {
    event: 'start',
    playerTurn,
  });

  console.log('START ', room);
};

const next = (message) => {
  const room = cache.get(message.roomId);
  // const { card, playerDeck } = nextMove(player);

  const { card: movePlayerACard, playerDeck: movePlayerADeck } = nextMove(
    room.playerA,
  );

  const { card: movePlayerBCard, playerDeck: movePlayerBDeck } = nextMove(
    room.playerB,
  );

  cache.set(message.roomId, {
    ...room,
    playerA: {
      ...room.playerA,
      deck: movePlayerADeck,
    },
    playerB: {
      ...room.playerB,
      deck: movePlayerBDeck,
    },
  });
  if (room.playerA.deck.length === 0 || room.playerB.deck.length === 0) {
    Socket.api.to(message.roomId, 'game', {
      event: 'finished',
    });
  } else {
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
  }
};

const playerWins = (message) => {
  console.log('receive start message ', message);
};

module.exports = {
  start,
  next,
  playerWins,
};
