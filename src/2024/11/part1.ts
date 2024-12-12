import type { ReadStream } from 'fs';
import { blinkCount, parseFile } from './utility';

export async function plutonianPebbles(
  puzzleInputFile: ReadStream,
  iterations: number
): Promise<number> {
  const input = await parseFile(puzzleInputFile);

  return input.reduce((sum, stone) => sum + blinkCount(stone, iterations), 0);
}
