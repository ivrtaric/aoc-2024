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
  const visited: Array<Array<boolean>> = map.map(row => row.map(_ => false));
  const regions: Array<Region> = [];

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (!visited[x][y]) {
        const region: Region = { type: map[x][y], plots: emptySet };
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

export const findSides = (region: Region): number => {
  return [...region.plots]
    .map(plot => plot.split(',').map(Number) as Location)
    .reduce(
      (sum: number, plot: Location) =>
        sum + countConvexAngles(plot, region.plots) + countConcaveAngles(plot, region.plots),
      0
    );

  function countConvexAngles([x, y]: Location, plots: Region['plots']): number {
    const { U, D, L, R } = getSurroundingKeys([x, y]);
    return [
      !plots.has(U) && !plots.has(R),
      !plots.has(U) && !plots.has(L),
      !plots.has(D) && !plots.has(R),
      !plots.has(D) && !plots.has(L)
    ].reduce((sum, check) => sum + (check ? 1 : 0), 0);
  }
  function countConcaveAngles([x, y]: Location, plots: Region['plots']): number {
    const { U, D, L, R, UL, UR, DL, DR } = getSurroundingKeys([x, y]);
    return [
      plots.has(U) && plots.has(R) && !plots.has(UR),
      plots.has(U) && plots.has(L) && !plots.has(UL),
      plots.has(D) && plots.has(R) && !plots.has(DR),
      plots.has(D) && plots.has(L) && !plots.has(DL)
    ].reduce((sum, check) => sum + (check ? 1 : 0), 0);
  }
  function getSurroundingKeys([x, y]: Location) {
    return {
      U: keyOf([x - 1, y]),
      D: keyOf([x + 1, y]),
      L: keyOf([x, y - 1]),
      R: keyOf([x, y + 1]),
      UL: keyOf([x - 1, y - 1]),
      UR: keyOf([x - 1, y + 1]),
      DL: keyOf([x + 1, y - 1]),
      DR: keyOf([x + 1, y + 1])
    };
  }
};

const emptySet = new Set<string>();
const visit = (
  [x, y]: Location,
  region: Region,
  map: Garden,
  visited: Array<Array<boolean>>
): Region['plots'] => {
  if (!isInMappedArea([x, y], map)) return emptySet;
  if (map[x][y] !== region.type) return emptySet;
  if (visited[x][y]) return emptySet;

  visited[x][y] = true;
  region.minX = x < (region.minX ?? Infinity) ? x : region.minX;
  region.maxX = x > (region.maxX ?? -1) ? x : region.maxX;
  region.minY = y < (region.minY ?? Infinity) ? y : region.minY;
  region.maxY = y > (region.maxY ?? -1) ? y : region.maxY;

  return new Set<string>([
    keyOf([x, y]),
    ...visit([x - 1, y], region, map, visited),
    ...visit([x + 1, y], region, map, visited),
    ...visit([x, y - 1], region, map, visited),
    ...visit([x, y + 1], region, map, visited)
  ]);
};

const keyOf = ([x, y]: Location): string => `${x},${y}`;

const isInMappedArea = ([x, y]: Location, map: Garden): boolean =>
  x >= 0 && x < map.length && y >= 0 && y < (map[0]?.length ?? 0);

const xor = (a: boolean, b: boolean): boolean => (a && !b) || (!a && b);
