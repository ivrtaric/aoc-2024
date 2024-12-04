import { ReadStream } from 'fs';
import * as readline from 'readline';
import { findXMas } from './utility';

export async function ceresSearch(puzzleInputFile: ReadStream): Promise<number> {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const searchField: Array<string> = [];
  for await (const line of lineReader) {
    searchField.push(line);
  }

  return findXMas(searchField);
}
