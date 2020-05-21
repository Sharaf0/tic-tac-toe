import { createContext } from "react";

export interface PlayersContext {
  playingPlayersCount(): number;
  currentPlayerId: number;
  setNextPlayerId(): void;
  // setInitialPlayer(): void;
  getPlayerName(playerNumber: number): string;
  setPlayerName(playerNumber: number, name: string): void;
  init(names: string[]): void;
  getPlayerSign(id: number): string;
}

const DEFAULT_PLAYERS_CONTEXT_VALUE: PlayersContext = {
  //TODO: Get those consts from config
  currentPlayerId: -1,
  playingPlayersCount: (): number => {
    throw Error("implement playingPlayersCount");
  },
  init: () => {
    throw Error("implement init");
  },
  setNextPlayerId: () => {
    throw Error("implement setNextPlayerId");
  },
  // setInitialPlayer: () => {
  //   throw Error("implement setInitialPlayer");
  // },
  getPlayerName: (playerNumber: number) => {
    throw Error("implement getPlayerName");
  },
  setPlayerName: (playerNumber: number, name: string) => {
    throw Error("implement setPlayerName");
  },
  getPlayerSign: (id: number): string => {
    throw Error("implement getPlayerSign");
  },
};

export const playersContext = createContext<PlayersContext>(
  DEFAULT_PLAYERS_CONTEXT_VALUE
);
