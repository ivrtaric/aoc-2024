import { ParsedLine } from './types';

export const numberSortComparator = (a: number, b: number) => a - b;

const LINE_PARSE_REGEX = /^(?<left>\d+)\s+(?<right>\d+)$/;
export const parseLine = (line: string): ParsedLine => {
  const result = LINE_PARSE_REGEX.exec(line);
  if (!result || !result.groups) throw new Error(`Couldn't parse line "${line}"`);

  return {
    left: parseInt(result.groups.left, 10),
    right: parseInt(result.groups.right, 10)
  };
};
