import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import classes from "./styles.module.scss";
import Square from "./Square";
import Score from "./Score";
import { getWinner, getPositionFromNumbersToString } from "./lib/Utils";
import { playersContext } from "./contexts/PlayersContext";

interface Props {
  names: string[];
  restart(): void;
}

const Board = (props: Props) => {
  const {
    init,
    addScoreToWinner,
    getPlayerName,
    setNextPlayerId,
    getPlayersScores,
    currentPlayerId,
  } = useContext(playersContext);
  const boardSize = 15;
  const winningSize = 5;
  useEffect(() => {
    init(props.names);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [lastMove, setLastMove] = useState<string | null>(null);
  //Map between the cell and the player played on that cell if any.
  const [moves, setMoves] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  const winnerPlayer = useMemo<number | null>(() => {
    if (lastMove === null) return null;
    const winner = getWinner(moves, lastMove, boardSize, winningSize);
    return winner;
  }, [lastMove, moves]);

  useEffect(() => {
    if (winnerPlayer !== null) {
      addScoreToWinner(winnerPlayer);
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
    props.restart();
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

  const currentPlayerName =
    currentPlayerId === -1 ? "" : getPlayerName(currentPlayerId);

  return (
    <div className={classes.game}>
      <div>
        <span>
          {!isGameOver
            ? `Current Player: ${currentPlayerName}`
            : isBoardFilled
            ? "Draw!"
            : winnerPlayer
            ? getPlayerName(winnerPlayer) + " won!"
            : ""}
        </span>
      </div>
      <div className={classes.board}>
        {isGameOver ? (
          <button onClick={restartGame}>Restart</button>
        ) : (
          Array<number>(boardSize)
            .fill(0)
            .map((_: any, i: number) => renderRow(i))
        )}
      </div>
      <div>
        <Score scores={getPlayersScores()}></Score>
      </div>
    </div>
  );
};

export default Board;
