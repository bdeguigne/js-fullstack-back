const cache = require('../utils/cache');
const { shuffle, splitDeck, nextMove } = require('../utils/game');
const Socket = require('../utils/socket');

const start = (message) => {
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
};

const next = (message) => {
  const room = cache.get(message.roomId);
  let winText = '';
  // const { card, playerDeck } = nextMove(player);

  const { card: movePlayerACard, playerDeck: movePlayerADeck } = nextMove(
    room.playerA,
  );

  const { card: movePlayerBCard, playerDeck: movePlayerBDeck } = nextMove(
    room.playerB,
  );

  if (movePlayerACard || movePlayerBCard) {
    if (movePlayerACard.value > movePlayerBCard.value) {
      room.playerA.points += 1;
      winText = 'player A win';
    } else if (movePlayerBCard.value > movePlayerACard.value) {
      room.playerB.points += 1;
      winText = 'player B win';
    } else {
      winText = 'draw';
    }
  }

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
    let playerWins = '';
    let draw = false;
    if (room.playerA.points > room.playerB.points) {
      playerWins = room.playerA.name;
    } else if (room.playerA.points < room.playerB.points) {
      playerWins = room.playerB.name;
    } else {
      draw = true;
    }
    Socket.api.to(message.roomId, 'game', {
      event: 'finished',
      win: playerWins,
      draw,
    });
  } else {
    Socket.api.to(message.roomId, 'game', {
      event: 'play',
      text: winText,
      playerA: {
        username: room.playerA.name,
        card: movePlayerACard,
        points: room.playerA.points,
      },
      playerB: {
        username: room.playerB.name,
        card: movePlayerBCard,
        points: room.playerB.points,
      },
    });
  }
};

module.exports = {
  start,
  next,
};
