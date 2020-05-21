import { PlayersContext } from "../contexts/PlayersContext";

import { useState, useCallback } from "react";
import Player from "../classes/Player";

export const usePlayers = (): PlayersContext => {
  const [playersRepo, setPlayersRepo] = useState<Array<Player>>(
    new Array<Player>()
  );

  const playingPlayersCount = (): number => {
    return playersRepo.filter((player) => player.inPlay).length;
  };

  const [currentPlayerId, setCurrentPlayerId] = useState(-1);

  const setNextPlayerId = useCallback(() => {
    const playingPlayersIds = playersRepo
      .filter((p) => p.inPlay)
      .map((p) => p.id);
    const index = playingPlayersIds.indexOf(currentPlayerId);
    const newId = playingPlayersIds[(index + 1) % playingPlayersIds.length];
    setCurrentPlayerId(newId);
  }, [currentPlayerId, playersRepo, setCurrentPlayerId]);

  const getPlayerName = (id: number): string => {
    const player = playersRepo.find((p) => p.id === id);
    if (!player) throw Error(`Player with id ${id} does not exist`);
    return player.name;
  };

  const setPlayerName = (id: number, newName: string): void => {
    setPlayersRepo(
      playersRepo.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  const init = (names: string[]) => {
    const cloneOfPlayersRepo = playersRepo;
    let firstId: number = -1;
    for (let index = 0; index < names.length; index++) {
      const name = names[index];
      const indexInRepo = cloneOfPlayersRepo.findIndex((p) => p.name === name);
      if (indexInRepo === -1) {
        const player = new Player(name);
        player.inPlay = true;
        cloneOfPlayersRepo.push(player);
        if (firstId === -1) firstId = player.id;
      } else {
        cloneOfPlayersRepo[indexInRepo].inPlay = true;
        if (firstId === -1) firstId = cloneOfPlayersRepo[indexInRepo].id;
      }
    }
    setCurrentPlayerId(firstId);
    setPlayersRepo(cloneOfPlayersRepo);
  };

  const getPlayerSign = (id: number): string => {
    const allSigns = "XO*$^";
    const playingPlayers = playersRepo.filter((p) => p.inPlay);
    return allSigns[playingPlayers.findIndex((p) => p.id === id)];
  };

  return {
    init,
    playingPlayersCount,
    currentPlayerId,
    setNextPlayerId,
    // setInitialPlayer,
    getPlayerName,
    setPlayerName,
    getPlayerSign,
  };
};
