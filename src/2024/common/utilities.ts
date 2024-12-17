import { createReadStream, existsSync, ReadStream } from 'fs';
import * as path from 'path';
import * as readline from 'readline';

import type { Location } from './types';

export const keyOf = ([x, y]: Location): string => `${x},${y}`;

export const xor = (a: boolean, b: boolean): boolean => (a && !b) || (!a && b);

export const loadLines = async (inputFileStream: ReadStream): Promise<Array<string>> =>
  parseFile<string>(inputFileStream, (line: string, index: number) => line);
export const parseFile = async <T>(
  inputFileStream: ReadStream,
  lineHandler: (line: string, index: number) => T
): Promise<Array<T>> => {
  const lineReader = readline.createInterface({
    input: inputFileStream,
    crlfDelay: Infinity
  });

  const resultsPerLine: Array<T> = [];
  let index = 0;
  for await (const line of lineReader) {
    resultsPerLine.push(lineHandler(line, index));
    index++;
  }

  return resultsPerLine;
};

const FIXTURE_FOLDER = path.join(__dirname, '..', '..', '..', 'test', 'fixtures');
export function getFixtureStream(fileName: string): ReadStream {
  const fullPath = path.join(FIXTURE_FOLDER, fileName);
  if (!existsSync(fullPath)) {
    throw new Error(`Cannot find file ${fileName} (full path: ${fullPath})`);
  }

  console.log(`Loading from file ${fullPath}`);
  return createReadStream(fullPath, { encoding: 'utf8' });
}
