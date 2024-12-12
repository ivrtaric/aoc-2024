import type { ReadStream } from 'fs';
import { findAllAntiNodes, parseFile } from './utility';

export async function resonantCollinearity(puzzleInputFile: ReadStream): Promise<number> {
  const mappedArea = await parseFile(puzzleInputFile);
  console.log(mappedArea.antennas);
  return findAllAntiNodes(mappedArea).size;
}
