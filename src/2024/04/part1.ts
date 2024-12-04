import { ReadStream } from 'fs';
import * as readline from 'readline';
import { diagonalDown, diagonalUp, findDuplexWordCount, pivot } from './utility';

export async function ceresSearch(puzzleInputFile: ReadStream): Promise<number> {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const searchField: Array<string> = [];
  for await (const line of lineReader) {
    searchField.push(line);
  }

  const counts: Array<number> = [
    findDuplexWordCount('XMAS', searchField),
    findDuplexWordCount('XMAS', pivot(searchField)),
    findDuplexWordCount('XMAS', diagonalDown(searchField)),
    findDuplexWordCount('XMAS', diagonalUp(searchField))
  ];

  return counts.reduce((sum, n) => sum + n, 0);
}
