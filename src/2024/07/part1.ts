import type { ReadStream } from 'fs';
import { parseInputFile, validateEquation } from 'src/2024/07/utility';

export async function bridgeRepair(puzzleInputFile: ReadStream): Promise<number> {
  const equations = await parseInputFile(puzzleInputFile);

  const results: Array<number> = equations
    .map(eq => validateEquation(eq, false))
    .filter(r => r !== null);

  return results.reduce((sum, r) => sum + r, 0);
}
