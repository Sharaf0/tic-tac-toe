import React from "react";
import classes from "./styles.module.scss";

interface Props {
  onClick(): void;
  playerPlayedHereNumber: number | undefined;
}

const Square = (props: Props) => {
  return (
    <button className={classes.square} onClick={props.onClick}>
      {/* TODO: Get what to draw from a context */}
      {props.playerPlayedHereNumber}
    </button>
  );
};

export default Square;
