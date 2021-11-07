const Socket = require('../utils/socket');
const cache = require('../utils/cache');
const { shuffle, splitDeck, nextMove } = require('../utils/game');

const join = (message, client) => {
  console.log('Receive join message ', message);
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
  console.log('Receive play message', message);

  const deck = shuffle();

  console.log('DECK LEN', deck.length);
  const { playerADeck, playerBDeck } = splitDeck(deck);

  console.log('playerADeck LEN', playerADeck.length);
  console.log('playerBDeck LEN', playerBDeck.length);

  const room = cache.get(message.roomId);

  room.playerA.deck = playerADeck;
  room.playerB.deck = playerBDeck;

  const playerTurn = room.playerA.name;

  const { card: movePlayerACard, playerDeck: movePlayerADeck } = nextMove(
    JSON.parse(JSON.stringify(room.playerA)),
  );

  const { card: movePlayerBCard, playerDeck: movePlayerBDeck } = nextMove(
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

const leave = (message) => {
  console.log('LEAVE CONTROLLER ', message);
};

module.exports = {
  join,
  play,
  leave,
};
