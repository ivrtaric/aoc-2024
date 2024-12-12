import { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';
import { numberSortComparator, parseLine } from './utility';

export async function historianHysteria(puzzleInputFile: ReadStream): Promise<number> {
  const leftNumbers: Array<number> = [];
  const rightNumbers: Array<number> = [];

  await parseFile(puzzleInputFile, line => {
    const { left, right } = parseLine(line);
    leftNumbers.push(left);
    rightNumbers.push(right);
  });

  leftNumbers.sort(numberSortComparator);
  rightNumbers.sort(numberSortComparator);

  return leftNumbers.reduce((sum, number, i) => sum + Math.abs(number - rightNumbers[i]), 0);
}
