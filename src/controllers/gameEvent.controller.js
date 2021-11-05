const connect = (message) => {
  console.log('CONNECT CONTROLLER ', message);
};

const next = (message) => {
  console.log('NEXT CONTROLLER ', message);
};

const playerWins = (message) => {
  console.log('PLAYER WINW CONTROLLER ', message);
};

module.exports = {
  connect,
  next,
  playerWins,
};
