import type { ReadStream } from 'fs';
import { findArea, findPerimeter, findRegions, parseFile } from './utility';

export async function gardenGroups(puzzleInputFile: ReadStream): Promise<number> {
  const map = await parseFile(puzzleInputFile);

  return findRegions(map).reduce(
    (sum, region) => sum + findArea(region) * findPerimeter(region),
    0
  );
}
