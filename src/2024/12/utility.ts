import type { ReadStream } from 'fs';
import * as readline from 'readline';

import { Garden, Location, Region } from './types';

export const parseFile = async (puzzleInputFile: ReadStream): Promise<Array<Array<string>>> => {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const map: Array<Array<string>> = [];
  for await (const line of lineReader) {
    map.push(line.split(''));
  }

  return map;
};

export const findRegions = (map: Garden): Array<Region> => {
  const visited: Array<Array<number>> = map.map(row => row.map(_ => 0));
  const regions: Array<Region> = [];

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (visited[x][y] === 0) {
        const type = map[x][y];
        const region: Region = { type, plots: emptySet };
        region.plots = visit([x, y], region, map, visited);
        regions.push(region);
      }
    }
  }

  return regions;
};

export const findArea = (region: Region): number => region.plots.size;
export const findPerimeter = (region: Region): number => {
  let perimeter = 0;

  for (let x = region.minX ?? 0; x <= (region.maxX ?? -1); x++) {
    let inRegion = false;
    for (let y = region.minY ?? 0; y <= (region.maxY ?? -1); y++) {
      if (xor(inRegion, region.plots.has(`${x},${y}`))) {
        perimeter++;
        inRegion = !inRegion;
      }
    }
    if (inRegion) perimeter++;
  }
  for (let y = region.minY ?? 0; y <= (region.maxY ?? -1); y++) {
    let inRegion = false;
    for (let x = region.minX ?? 0; x <= (region.maxX ?? -1); x++) {
      if (xor(inRegion, region.plots.has(`${x},${y}`))) {
        perimeter++;
        inRegion = !inRegion;
      }
    }
    if (inRegion) perimeter++;
  }

  return perimeter;
};

const emptySet = new Set<string>();
const visit = (
  [x, y]: Location,
  region: Region,
  map: Garden,
  visited: Array<Array<number>>
): Region['plots'] => {
  if (!isInMappedArea([x, y], map)) return emptySet;
  if (map[x][y] !== region.type) return emptySet;
  if (visited[x][y] === 1) return emptySet;

  visited[x][y] = 1;
  region.minX = x < (region.minX ?? Infinity) ? x : region.minX;
  region.maxX = x > (region.maxX ?? -1) ? x : region.maxX;
  region.minY = y < (region.minY ?? Infinity) ? y : region.minY;
  region.maxY = y > (region.maxY ?? -1) ? y : region.maxY;

  return new Set<string>([
    `${x},${y}`,
    ...visit([x - 1, y], region, map, visited),
    ...visit([x + 1, y], region, map, visited),
    ...visit([x, y - 1], region, map, visited),
    ...visit([x, y + 1], region, map, visited)
  ]);
};

const isInMappedArea = ([x, y]: Location, map: Garden): boolean =>
  x >= 0 && x < map.length && y >= 0 && y < (map[0]?.length ?? 0);

const xor = (a: boolean, b: boolean): boolean => (a && !b) || (!a && b);
