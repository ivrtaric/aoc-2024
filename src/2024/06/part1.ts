import type { ReadStream } from 'fs';

import { parseInputFile, traversePath } from './utility';

export async function guardGallivant(puzzleInputFile: ReadStream): Promise<number> {
  const { mappedArea, startingPosition } = await parseInputFile(puzzleInputFile);

  const { visitedPositionCount } = traversePath(mappedArea, startingPosition);

  return visitedPositionCount;
}
