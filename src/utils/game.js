const cards = require('./cards');

function shuffle() {
  for (let index = cards.length - 1; index > 0; index -= 1) {
    const NewIndex = Math.floor(Math.random() * (index + 1));
    const oldValue = cards[NewIndex];
    cards[NewIndex] = cards[index];
    cards[index] = oldValue;
  }
  return cards;
}

function splitDeck(deck) {
  const deckMidpoint = Math.ceil(deck.length / 2);
  const playerADeck = deck.slice(0, deckMidpoint);
  const playerBDeck = deck.slice(deckMidpoint, deck.length);

  return { playerADeck, playerBDeck };
}

function nextMove(player) {
  const card = player.deck.pop();

  return { card, playerDeck: player.deck };
}

module.exports = {
  shuffle,
  splitDeck,
  nextMove,
};
