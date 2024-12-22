import type { ReadStream } from 'fs';

import { matchDesign, parseInputFile } from './utility';

export async function linenLayout(puzzleInputFile: ReadStream): Promise<number> {
  const puzzleData = await parseInputFile(puzzleInputFile);

  const designCache = new Map<string, number>();
  const patterns = puzzleData.designs
    .map(design => matchDesign(design, puzzleData.patterns, designCache))
    .filter(p => p > 0);

  return patterns.length;
}
