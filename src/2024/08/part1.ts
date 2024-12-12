import type { ReadStream } from 'fs';
import { findAllAntiNodes, parseInputFile } from './utility';

export async function resonantCollinearity(puzzleInputFile: ReadStream): Promise<number> {
  const mappedArea = await parseInputFile(puzzleInputFile);

  return findAllAntiNodes(mappedArea).size;
}
