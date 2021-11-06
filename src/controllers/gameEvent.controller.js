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
  let player = null;
  let isPlayerA = false;

  if (message.playerName === room.playerA.name) {
    player = room.playerA;
    isPlayerA = true;
  } else {
    player = room.playerB;
  }
  if (player.name === room.playerTurn) {
    const { card, playerDeck } = nextMove(player);

    cache.set(message.roomId, {
      ...room,
      playerTurn: isPlayerA ? room.playerB.name : room.playerA.name,
      playerA: {
        ...room.playerA,
        deck: isPlayerA ? playerDeck : room.playerA.deck,
      },
      playerB: {
        ...room.playerB,
        deck: isPlayerA ? room.playerB.deck : playerDeck,
      },
    });
    if (room.playerA.deck.length === 0 || room.playerB.deck.length === 0) {
      Socket.api.to(message.roomId, 'game', {
        event: 'finished',
      });
    } else {
      Socket.api.to(message.roomId, 'game', {
        event: 'play',
        playerTurn: room.playerTurn,
        nextPlayer: isPlayerA ? room.playerB.name : room.playerA.name,
        card,
      });
    }
  } else {
    Socket.api.to(message.roomId, 'game', {
      event: 'error',
      data: `this is not your turn ${message.playerName} !`,
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
