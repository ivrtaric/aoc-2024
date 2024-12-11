import type { ReadStream } from 'fs';
import { blinkCount, parseFile } from './utility';

export async function plutonianPebbles(
  puzzleInputFile: ReadStream,
  iterations: number
): Promise<number> {
  const input = await parseFile(puzzleInputFile);

  // return blinks(input, iterations);
  return input.reduce((sum, stone) => {
    console.log(`Handling stone ${stone}`);
    return sum + blinkCount(stone, iterations);
  }, 0);
}
