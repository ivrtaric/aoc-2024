import type { ReadStream } from 'fs';

import { calculateTimeSavedByCheat, findShortestPath, parseInputFile } from './utility';

export async function raceCondition(puzzleInputFile: ReadStream): Promise<number> {
  const { start, end, map } = await parseInputFile(puzzleInputFile);

  const { distances } = findShortestPath(start, end, map);
  let over100 = 0;
  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[0].length - 1; j++) {
      if (calculateTimeSavedByCheat([i, j], distances, map) >= 100) {
        over100++;
      }
    }
  }

  return over100;
}
