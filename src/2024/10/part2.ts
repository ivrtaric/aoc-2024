import type { ReadStream } from 'fs';
import { findRating, parseFile } from './utility';

export async function hoofIt(puzzleInputFile: ReadStream): Promise<number> {
  const { startingPositions, map } = await parseFile(puzzleInputFile);

  const resultsArray = startingPositions.map(p => findRating(p, map));

  return resultsArray.reduce((sum, i) => sum + i, 0);
}