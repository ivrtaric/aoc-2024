import { ReadStream } from 'fs';
import { parseInputFile, validateEquation } from './utility';

export async function bridgeRepair(puzzleInputFile: ReadStream): Promise<number> {
  const equations = await parseInputFile(puzzleInputFile);

  const results: Array<number> = equations
    .map(eq => validateEquation(eq, true))
    .filter(r => r !== null);

  return results.reduce((sum, r) => sum + r, 0);
}
