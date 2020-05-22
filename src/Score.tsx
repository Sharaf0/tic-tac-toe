import React from "react";
import PlayerScore from "./classes/PlayerScore";

interface Props {
  scores: PlayerScore[];
}

//FIXME: Score is being called with every click!
const Score = (props: Props) => {
  return (
    <div>
      {props.scores
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((playerScore, index) => (
          <div key={index + 1}>
            <span>
              {playerScore.name}: {playerScore.score}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Score;
