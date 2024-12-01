import { ReadStream } from 'fs';
import * as readline from 'readline';

import { numberSortComparator, parseLine } from './utility';

export async function historianHysteria(puzzleInputFile: ReadStream): Promise<number> {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const leftNumbers: Array<number> = [];
  const rightNumbers: Array<number> = [];
  for await (const line of lineReader) {
    const { left, right } = parseLine(line);
    leftNumbers.push(left);
    rightNumbers.push(right);
  }
  leftNumbers.sort(numberSortComparator);
  rightNumbers.sort(numberSortComparator);

  return leftNumbers.reduce((sum, number, i) => sum + Math.abs(number - rightNumbers[i]), 0);
}
