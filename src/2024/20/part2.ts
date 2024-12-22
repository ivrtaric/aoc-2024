import type { ReadStream } from 'fs';

import { Location } from '../common/types';
import {
  calculateTimeSavedByCheat,
  canUseCheat,
  findShortestPath,
  parseInputFile
} from './utility';

export async function raceCondition(puzzleInputFile: ReadStream): Promise<number> {
  const { start, end, map } = await parseInputFile(puzzleInputFile);

  const { distances } = findShortestPath(start, end, map);
  const positions = [...distances.keys()].map(key => key.split(',').map(Number) as Location);
  let over100 = 0;
  for (let i = 0; i < positions.length - 1; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (
        canUseCheat(positions[i], positions[j], map) &&
        calculateTimeSavedByCheat(positions[i], positions[j], distances, map) >= 100
      ) {
        over100++;
      }
    }
  }

  return over100;
}
