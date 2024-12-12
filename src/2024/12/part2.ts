import { ReadStream } from 'fs';
import { findArea, findRegions, findSides, parseFile } from './utility';

export async function gardenGroups(puzzleInputFile: ReadStream): Promise<number> {
  const map = await parseFile(puzzleInputFile);

  return findRegions(map).reduce((sum, region) => {
    const [area, sides] = [findArea(region), findSides(region)];
    console.log({ type: region.type, area, sides });
    return sum + area * sides;
  }, 0);
}
