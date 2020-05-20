import React, { useState, useCallback, useMemo } from "react";
import classes from "./styles.module.scss";
import Square from "./Square";
import Score from "./Score";

//TODO: Transfer to Utils?
const getPositionFromNumbersToString = (r: number, c: number): string => {
  return r + "," + c;
};

//TODO: Transfer to Utils?
const getPositionFromStringToNumbers = (pos: string): [number, number] => {
  const splits = pos.split(",");
  return [+splits[0], +splits[1]];
};

//TODO: Transfer to Utils?
const getCountFromDirection = (
  moves: Map<string, number>,
  player: number,
  row: number,
  col: number,
  verticalMovement: -1 | 0 | 1,
  horizontalMovement: -1 | 0 | 1,
  boardSize: number
): number => {
  let count = 0;
  do {
    row += verticalMovement;
    col += horizontalMovement;
    count++;
  } while (
    row >= 0 &&
    col >= 0 &&
    row < boardSize &&
    col < boardSize &&
    moves.get(getPositionFromNumbersToString(row, col)) === player
  );

  return count;
};

//TODO: Transfer to Utils?
const getWinner = (
  moves: Map<string, number>,
  lastMove: string,
  boardSize: number
): number | null => {
  if (lastMove === null) return null;

  const [row, col] = getPositionFromStringToNumbers(lastMove);
  const player = moves.get(lastMove);

  if (player === undefined) {
    throw Error("last move must exist in moves");
  }

  enum Directions {
    Left = -1,
    Right = 1,
    Up = -1,
    Down = 1,
    Still = 0,
  }
  const directions = [
    //[r, c], [r, c]
    [
      [Directions.Still, Directions.Left],
      [Directions.Still, Directions.Right],
    ], //left, right
    [
      [Directions.Up, Directions.Still],
      [Directions.Down, Directions.Still],
    ], //up, down
    [
      [Directions.Up, Directions.Right],
      [Directions.Down, Directions.Left],
    ], //up right, down left
    [
      [Directions.Up, Directions.Left],
      [Directions.Down, Directions.Right],
    ], //up left, down right
  ];

  return directions.some(([d1, d2]) => {
    const c1 =
      getCountFromDirection(moves, player, row, col, d1[0], d1[1], boardSize) -
      1;
    const c2 =
      getCountFromDirection(moves, player, row, col, d2[0], d2[1], boardSize) -
      1;
    return c1 + c2 + 1 === boardSize;
  })
    ? player
    : null;
};

const Board = () => {
  //TODO: Get from config
  const numberOfPlayers = 2;
  const boardSize = 3;
  const intialPlayer = 0;

  const [currentPlayer, setCurrentPlayer] = useState<number>(intialPlayer);
  const [lastMove, setLastMove] = useState<string | null>(null);
  //Map between the cell and the player played on that cell if any.
  const [moves, setMoves] = useState<Map<string, number>>(
    new Map<string, number>()
  );
  const [scores, setScores] = useState<Array<number>>(
    new Array<number>(numberOfPlayers).fill(0)
  );

  const winnerPlayer = useMemo<number | null>(() => {
    if (lastMove === null) return null;
    const winner = getWinner(moves, lastMove, boardSize);
    if (winner !== null) {
      const clonedScores = Object.assign([], scores);
      clonedScores[winner]++;
      setScores(clonedScores);
    }
    return winner;
  }, [lastMove, moves, scores]);

  const isBoardFilled = useMemo<boolean>(() => {
    return moves.size === boardSize * boardSize;
    //FIXME: lastMove is unneeded here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, lastMove]);

  const isGameOver = useMemo<boolean>(() => {
    return winnerPlayer !== null || isBoardFilled;
  }, [isBoardFilled, winnerPlayer]);

  const onSquareClick = useCallback(
    (rowNumber: number, colNumber: number): void => {
      //Not to click on a filled cell.
      const pos: string = getPositionFromNumbersToString(rowNumber, colNumber);
      if (moves.has(pos) === true) return;

      setLastMove(pos);
      const newMoves = moves.set(pos, currentPlayer);
      setMoves(newMoves);
      setCurrentPlayer((currentPlayer + 1) % numberOfPlayers);
    },
    [currentPlayer, moves]
  );

  const restartGame = () => {
    //TODO: Fix that.
    setCurrentPlayer(intialPlayer);
    setLastMove(null);
    setMoves(new Map<string, number>());
  };

  const renderRow = useCallback(
    (rowNumber: number) => {
      return (
        <div key={rowNumber} className={classes.boardRow}>
          {Array<number>(boardSize)
            .fill(0)
            .map((_: any, colNumber: number) => (
              <Square
                key={colNumber}
                playerPlayedHereNumber={moves.get(
                  getPositionFromNumbersToString(rowNumber, colNumber)
                )}
                onClick={() => onSquareClick(rowNumber, colNumber)}
              />
            ))}
        </div>
      );
    },
    [moves, onSquareClick]
  );

  const renderedSquares = Array<number>(boardSize)
    .fill(0)
    .map((_: any, i: number) => renderRow(i));

  const body = isGameOver ? (
    <button onClick={restartGame}>Restart</button>
  ) : (
    renderedSquares
  );

  return (
    <div className={classes.game}>
      <div>
        <span>Current Player: {currentPlayer}</span>
      </div>
      <div className={classes.board}>{body}</div>
      <div>
        <Score scores={scores}></Score>
      </div>
    </div>
  );
};

export default Board;
