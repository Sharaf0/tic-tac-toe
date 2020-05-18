import React from "react";
import classes from "./styles.module.scss";

function App() {
  return <div className={classes.game}>
    <div className={classes.board}>
      <div className={classes.boardRow}>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
      </div>
      <div className={classes.boardRow}>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
      </div>
      <div className={classes.boardRow}>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
      </div>
      <div className={classes.boardRow}>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
      </div>
      <div className={classes.boardRow}>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
        <button className={classes.square}></button>
      </div>
    </div>
  </div>;
}

export default App;
