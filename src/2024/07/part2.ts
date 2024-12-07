import { ReadStream } from 'fs';
import { parseFile, validateEquation } from './utility';

export async function bridgeRepair(puzzleInputFile: ReadStream): Promise<number> {
  const equations = await parseFile(puzzleInputFile);

  const results: Array<number> = equations.map(eq => validateEquation(eq, true)).filter(r => r !== null);

  return results.reduce((sum, r) => sum + r, 0);
}
