import React, { useState } from "react";
import Board from "./Board";
import { usePlayers } from "./hooks/players.hook";
import { playersContext } from "./contexts/PlayersContext";

function App() {
  const [numOfPlayers, setNumOfPlayers] = useState<number>(2);
  const [inPlayMode, setInPlayMode] = useState<boolean>(false);
  const [names, setNames] = useState<Array<string>>(new Array<string>());

  const restart = () => {
    setInPlayMode(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!value) return;
    setNumOfPlayers(value);
  };

  const getPlayerName = (index: number): string => {
    const person = prompt(
      `Please enter player${index + 1} name:`,
      `Player ${index + 1}`
    );
    if (person === null || person === "") {
      return getPlayerName(index);
    } else {
      return person;
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const inputNames = new Array<string>(numOfPlayers);
    for (let index = 0; index < inputNames.length; index++) {
      inputNames[index] = getPlayerName(index);
    }
    setInPlayMode(true);
    setNames(inputNames);
    event.preventDefault();
  };

  const body = inPlayMode ? (
    <Board names={names} restart={restart} />
  ) : (
    <form onSubmit={onSubmit}>
      <label>Enter number of players: </label>
      <input
        type="number"
        value={numOfPlayers}
        min="1"
        max="5"
        onChange={onChange}
      ></input>
      <input type="submit" value="Submit" />
    </form>
  );

  return (
    <playersContext.Provider value={usePlayers()}>
      {body}
    </playersContext.Provider>
  );
}

export default App;
