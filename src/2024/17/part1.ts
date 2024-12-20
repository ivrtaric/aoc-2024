import type { ReadStream } from 'fs';
import { parseInputFile, run } from './utility';

export async function chronospatialComputer(puzzleInputFile: ReadStream): Promise<string> {
  const puzzleData = await parseInputFile(puzzleInputFile);

  return run({ ...puzzleData, instructionPointer: 0, output: [] });
}
