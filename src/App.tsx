import React from "react";
import classes from "./styles.module.scss";

function App() {
  const renderSquare = (i: number) => {
    return <button key={i} className={classes.square}></button>;
  };
  const renderRow = (i: number) => {
    return (
      <div key={i} className={classes.boardRow}>
        {Array<number>(15
        )
          .fill(0)
          .map((_: any, i: number) => renderSquare(i))}
      </div>
    );
  };
  return (
    <div className={classes.game}>
      <div className={classes.board}>
        {Array<number>(15)
          .fill(0)
          .map((_: any, i: number) => renderRow(i))}
      </div>
    </div>
  );
}

export default App;
