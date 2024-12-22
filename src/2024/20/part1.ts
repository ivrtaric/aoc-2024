import type { ReadStream } from 'fs';

import { calculateTimeSavedByCheat, findShortestPath, parseInputFile } from './utility';
import { Tiles } from 'src/2024/20/types';

export async function raceCondition(puzzleInputFile: ReadStream): Promise<number> {
  const { start, end, map } = await parseInputFile(puzzleInputFile);

  const { distances } = findShortestPath(start, end, map);
  let over100 = 0;
  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[0].length - 1; j++) {
      if (map[i][j] !== Tiles.WALL) continue;

      if (calculateTimeSavedByCheat([i - 1, j], [i + 1, j], distances, map) >= 100) {
        over100++;
      }
      if (calculateTimeSavedByCheat([i, j - 1], [i, j + 1], distances, map) >= 100) {
        over100++;
      }
    }
  }

  return over100;
}
