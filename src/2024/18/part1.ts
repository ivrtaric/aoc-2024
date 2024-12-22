import type { ReadStream } from 'fs';

import { CORRUPTED } from './types';
import { createMemory, findShortestPathLength, parseInputFile } from './utility';

export async function ramRun(
  puzzleInputFile: ReadStream,
  maxIndex: number,
  corruptedBytes: number
): Promise<number> {
  const memory = createMemory(maxIndex);

  const puzzleData = await parseInputFile(puzzleInputFile);
  for (let i = 0; i < corruptedBytes; i++) {
    const [x, y] = puzzleData[i];
    memory[x][y] = CORRUPTED;
  }

  return findShortestPathLength([0, 0], [maxIndex, maxIndex], memory);
}
