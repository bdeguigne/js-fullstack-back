const httpStatus = require('http-status');
const Lobby = require('../models/lobby.model');
const ApiError = require('../utils/ApiError');

const getAllLobby = async () => {
  const lobbies = await Lobby.find();
  return lobbies;
};

const getLobbyById = async (lobbyId) => {
  return Lobby.findById(lobbyId);
};

const create = async (body) => {
  const lobby = await Lobby.create(body);
  return lobby;
};

const updateLobbyById = async (lobbyId, updateBody) => {
  const lobby = await getLobbyById(lobbyId);
  if (!lobby) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lobby not found');
  }
  Object.assign(lobby, updateBody);
  await lobby.save();
  return lobby;
};

const deleteLobbyById = async (lobbyId) => {
  const lobby = await getLobbyById(lobbyId);
  if (!lobby) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lobby not found');
  }
  await lobby.remove();
  return lobby;
};

module.exports = {
  getAllLobby,
  create,
  updateLobbyById,
  deleteLobbyById,
  getLobbyById,
};
