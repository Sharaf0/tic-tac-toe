import { createContext } from "react";

export interface PlayersContext {
  numberOfPlayers: number;
  currentPlayer: number;
  setNextPlayer(): void;
  initialPlayer: number;
  setInitialPlayer(): void;
  getPlayerName(playerNumber: number): string;
  setPlayerName(playerNumber: number, name: string): void;
}

export const DEFAULT_PLAYERS_CONTEXT_VALUE: PlayersContext = {
  //TODO: Get those consts from config
  currentPlayer: -1,
  initialPlayer: 0,
  numberOfPlayers: 3,
  setNextPlayer: () => {
    throw Error("implement setNextPlayer");
  },
  setInitialPlayer: () => {
    throw Error("implement setInitialPlayer");
  },
  getPlayerName: (playerNumber: number) => {
    throw Error("implement getPlayerName");
  },
  setPlayerName: (playerNumber: number, name: string) => {
    throw Error("implement setPlayerName");
  },
};

export const playersContext = createContext<PlayersContext>(
  DEFAULT_PLAYERS_CONTEXT_VALUE
);
