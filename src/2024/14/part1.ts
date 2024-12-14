import type { ReadStream } from 'fs';
import { endingPosition, parseInputFile, splitInQuadrants } from './utility';

import type { Space } from '../common/types';

export async function restroomRedoubt(
  puzzleInputFile: ReadStream,
  space: Space,
  seconds: number
): Promise<number> {
  const robots = await parseInputFile(puzzleInputFile);

  const { Q1, Q2, Q3, Q4 } = splitInQuadrants(
    robots.map(r => endingPosition(r, space, seconds)),
    space
  );
  return Q1 * Q2 * Q3 * Q4;
}
