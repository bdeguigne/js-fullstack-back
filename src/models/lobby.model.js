const mongoose = require('mongoose');

const lobbySchema = mongoose.Schema(
  {
    playerA: {
      type: String,
      trim: true,
    },
    playerB: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Lobby = mongoose.model('Lobby', lobbySchema);

module.exports = Lobby;
