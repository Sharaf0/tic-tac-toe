import React from "react";
import Board from "./Board";
import { usePlayers } from "./hooks/players.hook";
import { playersContext } from "./contexts/PlayersContext";

function App() {
  return (
    <playersContext.Provider value={usePlayers()}>
      <Board />
    </playersContext.Provider>
  );
}

export default App;
