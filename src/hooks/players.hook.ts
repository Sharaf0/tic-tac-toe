import {
  DEFAULT_PLAYERS_CONTEXT_VALUE,
  PlayersContext,
} from "../contexts/PlayersContext";

import { useState, useCallback } from "react";

export const usePlayers = (): PlayersContext => {
  const [numberOfPlayers] = useState(
    DEFAULT_PLAYERS_CONTEXT_VALUE.numberOfPlayers
  );

  const [currentPlayer, setCurrentPlayer] = useState(
    DEFAULT_PLAYERS_CONTEXT_VALUE.initialPlayer
  );

  const [names, setNames] = useState<string[]>(
    new Array<string>(DEFAULT_PLAYERS_CONTEXT_VALUE.numberOfPlayers).fill('')
  );

  const setNextPlayer = useCallback(() => {
    setCurrentPlayer((currentPlayer + 1) % numberOfPlayers);
  }, [currentPlayer, numberOfPlayers]);

  const setInitialPlayer = useCallback(() => {
    setCurrentPlayer(DEFAULT_PLAYERS_CONTEXT_VALUE.initialPlayer);
  }, []);

  const getPlayerName = (playerNumber: number) => {
    return names[playerNumber] === ""
      ? `Player ${playerNumber + 1}`
      : names[playerNumber];
  };

  const setPlayerName = (playerNumber: number, newName: string) => {
    setNames(
      names.map((name, index) => (index === playerNumber ? newName : name))
    );
  };

  return {
    numberOfPlayers,
    currentPlayer,
    initialPlayer: DEFAULT_PLAYERS_CONTEXT_VALUE.initialPlayer,
    setNextPlayer,
    setInitialPlayer,
    getPlayerName,
    setPlayerName,
  };
};
