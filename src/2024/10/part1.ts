import type { ReadStream } from 'fs';
import { parseFile, search } from './utility';

export async function hoofIt(puzzleInputFile: ReadStream): Promise<number> {
  const { startingPositions, map } = await parseFile(puzzleInputFile);

  const resultsArray = startingPositions.map(p => search(p, null, map));

  return resultsArray.reduce((sum, i) => sum + i.size, 0);
}
