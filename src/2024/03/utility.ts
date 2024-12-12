import type { NumberPair } from '../common/types';

const MUL_REGEX = /mul\((?<first>\d+),(?<second>\d+)\)/g;
const TRIM_REGEX = /(?=don't\(\)).*?(?=do\(\))|(?=don't\(\)).*/g;

export type Multiples = { first: string; second: string };

export const findMuls = (line: string): Array<NumberPair> => {
  const multiples: Array<NumberPair> = [];
  MUL_REGEX.lastIndex = 0;
  for (;;) {
    const result = MUL_REGEX.exec(line);
    if (!result?.groups) break;

    const { first, second } = result.groups as unknown as Multiples;
    multiples.push([parseInt(first, 10), parseInt(second, 10)]);
  }

  MUL_REGEX.lastIndex = 0;
  return multiples;
};

export const findStatefulMuls = (line: string): Array<NumberPair> => {
  const trimmedLine = line.replaceAll(TRIM_REGEX, '');

  return findMuls(trimmedLine);
};
