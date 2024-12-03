import { ReadStream } from 'fs';
import * as readline from 'readline';
import { findMuls } from 'src/2024/03/utility';

export async function mullItOver(puzzleInputFile: ReadStream): Promise<number> {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const lines: Array<string> = [];
  for await (const line of lineReader) {
    lines.push(line);
  }

  const multiples: Array<number> = [];
  const lineMultiples = findMuls(lines.join(''));
  multiples.push(...lineMultiples.map(([a, b]) => a * b));

  return multiples.reduce((sum, m) => sum + m, 0);
}
