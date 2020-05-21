export const getPositionFromStringToNumbers = (
  pos: string
): [number, number] => {
  const splits = pos.split(",");
  return [+splits[0], +splits[1]];
};

export const getPositionFromNumbersToString = (
  r: number,
  c: number
): string => {
  return r + "," + c;
};

export const getCountFromDirection = (
  moves: Map<string, number>,
  player: number,
  row: number,
  col: number,
  verticalMovement: -1 | 0 | 1,
  horizontalMovement: -1 | 0 | 1,
  boardSize: number
): number => {
  let count = 0;
  do {
    row += verticalMovement;
    col += horizontalMovement;
    count++;
  } while (
    row >= 0 &&
    col >= 0 &&
    row < boardSize &&
    col < boardSize &&
    moves.get(getPositionFromNumbersToString(row, col)) === player
  );

  return count;
};

export const getWinner = (
  moves: Map<string, number>,
  lastMove: string,
  boardSize: number,
  winningSize: number
): number | null => {
  if (lastMove === null) return null;

  const [row, col] = getPositionFromStringToNumbers(lastMove);
  const player = moves.get(lastMove);

  if (player === undefined) {
    throw Error("last move must exist in moves");
  }

  enum Directions {
    Left = -1,
    Right = 1,
    Up = -1,
    Down = 1,
    Still = 0,
  }
  const directions = [
    //[r, c], [r, c]
    [
      [Directions.Still, Directions.Left],
      [Directions.Still, Directions.Right],
    ], //left, right
    [
      [Directions.Up, Directions.Still],
      [Directions.Down, Directions.Still],
    ], //up, down
    [
      [Directions.Up, Directions.Right],
      [Directions.Down, Directions.Left],
    ], //up right, down left
    [
      [Directions.Up, Directions.Left],
      [Directions.Down, Directions.Right],
    ], //up left, down right
  ];

  return directions.some(([d1, d2]) => {
    const c1 =
      getCountFromDirection(moves, player, row, col, d1[0], d1[1], boardSize) -
      1;
    const c2 =
      getCountFromDirection(moves, player, row, col, d2[0], d2[1], boardSize) -
      1;
    return c1 + c2 + 1 === winningSize;
  })
    ? player
    : null;
};
