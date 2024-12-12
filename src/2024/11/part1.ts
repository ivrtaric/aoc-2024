import type { ReadStream } from 'fs';
import { blinkCount, parseInputFile } from './utility';

export async function plutonianPebbles(
  puzzleInputFile: ReadStream,
  iterations: number
): Promise<number> {
  const input = await parseInputFile(puzzleInputFile);

  return input.reduce((sum, stone) => sum + blinkCount(stone, iterations), 0);
}
