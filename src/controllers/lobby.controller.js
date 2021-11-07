const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const lobbyService = require('../services/lobby.service');

const getAllLobby = catchAsync(async (req, res) => {
  const lobbies = await lobbyService.getAllLobby();
  res.status(httpStatus.OK).send(
    lobbies.map((lobby) => {
      return {
        id: lobby.id,
        playerA: lobby.playerA,
        playerB: lobby.playerB,
        status: lobby.status,
        createdAt: lobby.createdAt,
        updateAt: lobby.updatedAt,
      };
    }),
  );
});

const getLobby = catchAsync(async (req, res) => {
  const lobby = await lobbyService.getLobbyById(req.params.userId);
  if (!lobby) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lobby not found');
  }
  res.send(lobby);
});

const create = catchAsync(async (req, res) => {
  const lobby = await lobbyService.create(req.body);

  res.status(httpStatus.CREATED).send({
    id: lobby.id,
    playerA: lobby.playerA,
    playerB: lobby.playerB,
    status: lobby.status,
    createdAt: lobby.createdAt,
    updateAt: lobby.updatedAt,
  });
});

const update = catchAsync(async (req, res) => {
  const lobby = await lobbyService.updateLobbyById(
    req.params.lobbyId,
    req.body,
  );
  res.status(httpStatus.OK).send(lobby);
});

const deleteLobby = catchAsync(async (req, res) => {
  await lobbyService.deleteLobbyById(req.params.lobbyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { getAllLobby, create, update, deleteLobby, getLobby };
