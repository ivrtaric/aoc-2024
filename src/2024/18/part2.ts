import type { ReadStream } from 'fs';

import { keyOf } from '../common/utilities';

import { CORRUPTED } from './types';
import { createMemory, findShortestPathLength, parseInputFile } from './utility';

export async function ramRun(
  puzzleInputFile: ReadStream,
  maxIndex: number,
  corruptedBytes: number
): Promise<string> {
  const memory = createMemory(maxIndex);

  const puzzleData = await parseInputFile(puzzleInputFile);
  for (let i = 0; i < corruptedBytes; i++) {
    const [x, y] = puzzleData[i];
    memory[x][y] = CORRUPTED;
  }

  for (const [x, y] of puzzleData.slice(corruptedBytes)) {
    memory[x][y] = CORRUPTED;
    try {
      findShortestPathLength([0, 0], [maxIndex, maxIndex], [...memory.map(a => [...a])]);
    } catch (e) {
      return keyOf([x, y]);
    }
  }

  return '';
}
