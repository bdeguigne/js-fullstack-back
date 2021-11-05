const join = (message) => {
  console.log('IN JOIN LOBBY CONTROLLER ', message);
};

const play = (message) => {
  console.log('PLAY CONTROLLER ', message);
};

const leave = (message) => {
  console.log('LEAVE CONTROLLER ', message);
};

module.exports = {
  join,
  play,
  leave,
};
