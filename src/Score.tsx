import React, { useContext } from "react";
import { playersContext } from "./contexts/PlayersContext";

interface Props {
  scores: number[];
}
//FIXME: Score is being called with every click!
const Score = (props: Props) => {
  const { getPlayerName } = useContext(playersContext);

  return (
    <div>
      {props.scores.map((score, index) => (
        <div key={index + 1}>
          <span>
            {getPlayerName(index)}: {score}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Score;
