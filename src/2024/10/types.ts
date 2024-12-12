import type { Location } from '../common/types';

export type TopographicMap = Array<Array<number>>;
export type PuzzleInput = {
  map: TopographicMap;
  startingPositions: Array<Location>;
};
