import type { ReadStream } from 'fs';

import { parseFile, traversePath } from './utility';

export async function guardGallivant(puzzleInputFile: ReadStream): Promise<number> {
  const { mappedArea, startingPosition } = await parseFile(puzzleInputFile);

  const { visitedPositionCount } = traversePath(mappedArea, startingPosition);

  return visitedPositionCount;
}
