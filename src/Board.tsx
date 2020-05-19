import React, { useState, useCallback, useMemo } from "react";
import classes from "./styles.module.scss";
import Square from "./Square";

const getPositionFromNumbersToString = (r: number, c: number): string => {
  return r + "," + c;
};

const Board = () => {
  //TODO: Get from config
  const numberOfPlayers = 2;
  const boardWidth = 2;
  const boardHeight = 2;

  const [currentPlayer, setCurrentPlayer] = useState<number>(0);

  //Map between the cell and the player played on that cell if any.
  const [moves, setMoves] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  const onSquareClick = (rowNumber: number, colNumber: number): void => {
    //Not to click on a filled cell.
    if (
      moves.has(getPositionFromNumbersToString(rowNumber, colNumber)) === true
    )
      return;

    const newMoves = moves.set(
      getPositionFromNumbersToString(rowNumber, colNumber),
      currentPlayer
    );

    setMoves(newMoves);

    setCurrentPlayer((currentPlayer + 1) % numberOfPlayers);
  };

  const renderRow = useCallback(
    (rowNumber: number) => {
      return (
        <div key={rowNumber} className={classes.boardRow}>
          {Array<number>(boardWidth)
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

  return (
    <div className={classes.game}>
      <div>
        <span>Current Player: {currentPlayer}</span>
      </div>
      <div className={classes.board}>
        {Array<number>(boardHeight)
          .fill(0)
          .map((_: any, i: number) => renderRow(i))}
      </div>
    </div>
  );
};

export default Board;
