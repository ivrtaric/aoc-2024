import { ReadStream } from 'fs';
import { findArea, findRegions, findSides, parseInputFile } from './utility';

export async function gardenGroups(puzzleInputFile: ReadStream): Promise<number> {
  const map = await parseInputFile(puzzleInputFile);

  return findRegions(map).reduce((sum, region) => sum + findArea(region) * findSides(region), 0);
}
