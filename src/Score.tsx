import React from "react";

interface Props {
  scores: number[];
}

const Score = (props: Props) => {
  return (
    <div>
      {props.scores.map((score, index) => (
        <div>
          <span>
            Player{index + 1}: {score}{" "}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Score;
