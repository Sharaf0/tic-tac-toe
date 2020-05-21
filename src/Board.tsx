import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import classes from "./styles.module.scss";
import Square from "./Square";
//import Score from "./Score";
import { getWinner, getPositionFromNumbersToString } from "./lib/Utils";
import { playersContext } from "./contexts/PlayersContext";

interface Props {
  names: string[];
}

const Board = (props: Props) => {
  //TODO: Get from config
  const {
    init,
    currentPlayerId,
    getPlayerName,
    setNextPlayerId,
    playingPlayersCount,
  } = useContext(playersContext);
  const boardSize = 5; //TODO: 15
  const winningSize = 2; //TODO: 5
  useEffect(() => {
    init(props.names);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [lastMove, setLastMove] = useState<string | null>(null);
  //Map between the cell and the player played on that cell if any.
  const [moves, setMoves] = useState<Map<string, number>>(
    new Map<string, number>()
  );
  const [scores, setScores] = useState<Array<number>>(
    new Array<number>(playingPlayersCount()).fill(0)
  );

  const winnerPlayer = useMemo<number | null>(() => {
    if (lastMove === null) return null;
    const winner = getWinner(moves, lastMove, boardSize, winningSize);
    return winner;
  }, [lastMove, moves]);

  useEffect(() => {
    if (winnerPlayer !== null) {
      const clonedScores = Object.assign([], scores);
      clonedScores[winnerPlayer]++;
      setScores(clonedScores);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerPlayer]);

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
      const newMoves = moves.set(pos, currentPlayerId);
      setMoves(newMoves);
      setNextPlayerId();
    },
    [currentPlayerId, moves, setNextPlayerId]
  );

  const restartGame = () => {
    //TODO: Fix that.
    // setInitialPlayer();
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
                playerId={moves.get(
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
        <span>
          Current Player:{" "}
          {currentPlayerId === -1 ? "" : getPlayerName(currentPlayerId)}
        </span>
      </div>
      <div className={classes.board}>{body}</div>
      <div>{/* <Score scores={scores}></Score> */}</div>
    </div>
  );
};

export default Board;
