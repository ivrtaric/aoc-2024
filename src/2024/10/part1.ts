import type { ReadStream } from 'fs';
import { findScore, parseFile } from './utility';

export async function hoofIt(puzzleInputFile: ReadStream): Promise<number> {
  const { startingPositions, map } = await parseFile(puzzleInputFile);

  const resultsArray = startingPositions.map(p => findScore(p, map));

  return resultsArray.reduce((sum, i) => sum + i.size, 0);
}
