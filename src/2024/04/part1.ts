import { ReadStream } from 'fs';

import { loadLines } from '../common/utilities';
import { diagonalDown, diagonalUp, findDuplexWordCount, pivot } from './utility';

export async function ceresSearch(puzzleInputFile: ReadStream): Promise<number> {
  const searchField = await loadLines(puzzleInputFile);

  const counts: Array<number> = [
    findDuplexWordCount('XMAS', searchField),
    findDuplexWordCount('XMAS', pivot(searchField)),
    findDuplexWordCount('XMAS', diagonalDown(searchField)),
    findDuplexWordCount('XMAS', diagonalUp(searchField))
  ];

  return counts.reduce((sum, n) => sum + n, 0);
}
