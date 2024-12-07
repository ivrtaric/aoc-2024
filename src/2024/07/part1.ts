import type { ReadStream } from 'fs';
import { parseFile, validateEquation } from 'src/2024/07/utility';

export async function bridgeRepair(puzzleInputFile: ReadStream): Promise<number> {
  const equations = await parseFile(puzzleInputFile);

  const results: Array<number> = equations.map(eq => validateEquation(eq)).filter(r => r !== null);

  return results.reduce((sum, r) => sum + r, 0);
}
