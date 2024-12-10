export type Location = [number, number];
export type TopographicMap = Array<Array<number>>;
export type PuzzleInput = {
  map: TopographicMap;
  startingPositions: Array<Location>;
};
