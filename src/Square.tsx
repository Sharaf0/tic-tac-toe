import React, { useContext } from "react";
import classes from "./styles.module.scss";
import { playersContext } from "./contexts/PlayersContext";

interface Props {
  onClick(): void;
  playerId: number | undefined;
}

const Square = (props: Props) => {
  const { getPlayerSign } = useContext(playersContext);
  const sign =
    props.playerId !== undefined ? getPlayerSign(props.playerId) : "";
  return (
    <button className={classes.square} onClick={props.onClick}>
      {sign}
    </button>
  );
};

export default Square;
