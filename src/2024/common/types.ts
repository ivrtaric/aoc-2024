export type NumberPair = [number, number];
export type Direction = [0 | 1 | -1, 0 | 1 | -1];
export type Location = [number, number];
export type Space = { width: number; height: number };

export type MappedArea<T = string> = Array<Array<T>>;

export const Directions = Object.freeze<Record<string, Direction>>({
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1]
});
