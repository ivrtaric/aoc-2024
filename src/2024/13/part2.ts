import { ReadStream } from 'fs';
import { calculateButtonPresses, parseInputFile } from './utility';

export async function clawContraption(puzzleInputFile: ReadStream): Promise<number> {
  const { systems } = await parseInputFile(puzzleInputFile, true);

  return systems.reduce((sum, system) => sum + calculateButtonPresses(system), 0);
}
