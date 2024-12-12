import type { ReadStream } from 'fs';
import * as readline from 'readline';

import type { Location } from './types';

export const keyOf = ([x, y]: Location): string => `${x},${y}`;

export const xor = (a: boolean, b: boolean): boolean => (a && !b) || (!a && b);

export const loadLines = async (inputFileStream: ReadStream): Promise<Array<string>> =>
  parseFile<string>(inputFileStream, (line: string) => line);
export const parseFile = async <T>(
  inputFileStream: ReadStream,
  lineHandler: (line: string) => T
): Promise<Array<T>> => {
  const lineReader = readline.createInterface({
    input: inputFileStream,
    crlfDelay: Infinity
  });

  const resultsPerLine: Array<T> = [];
  for await (const line of lineReader) {
    resultsPerLine.push(lineHandler(line));
  }

  return resultsPerLine;
};
