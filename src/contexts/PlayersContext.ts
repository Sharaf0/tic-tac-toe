import { createContext } from "react";
import PlayerScore from "../classes/PlayerScore";

export interface PlayersContext {
  playingPlayersCount(): number;
  currentPlayerId: number;
  setNextPlayerId(): void;
  getPlayersScores(): PlayerScore[];
  getPlayerName(playerNumber: number): string;
  setPlayerName(playerNumber: number, name: string): void;
  init(names: string[]): void;
  getPlayerSign(id: number): string;
  addScoreToWinner(id: number): void;
}

const DEFAULT_PLAYERS_CONTEXT_VALUE: PlayersContext = {
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
  getPlayerName: (playerNumber: number) => {
    throw Error("implement getPlayerName");
  },
  setPlayerName: (playerNumber: number, name: string) => {
    throw Error("implement setPlayerName");
  },
  getPlayerSign: (id: number): string => {
    throw Error("implement getPlayerSign");
  },
  addScoreToWinner: (id: number): void => {
    throw Error("implement addScoreToWinner");
  },
  getPlayersScores: (): PlayerScore[] => {
    throw Error("implement getPlayersScores");
  },
};

export const playersContext = createContext<PlayersContext>(
  DEFAULT_PLAYERS_CONTEXT_VALUE
);
