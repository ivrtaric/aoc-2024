import type { ReadStream } from 'fs';

import type { Location, MappedArea } from '../common/types';
import { keyOf, parseFile, xor } from '../common/utilities';

import type { Region } from './types';

export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<MappedArea> =>
  parseFile<Array<string>>(puzzleInputFile, line => line.split(''));

export const findRegions = (map: MappedArea): Array<Region> => {
  const visited: Array<Array<boolean>> = map.map(row => row.map(_ => false));
  const regions: Array<Region> = [];

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (!visited[x][y]) {
        const region = createRegion(map[x][y]);
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
      if (xor(inRegion, region.plots.has(keyOf([x, y])))) {
        perimeter++;
        inRegion = !inRegion;
      }
    }
    if (inRegion) perimeter++;
  }
  for (let y = region.minY ?? 0; y <= (region.maxY ?? -1); y++) {
    let inRegion = false;
    for (let x = region.minX ?? 0; x <= (region.maxX ?? -1); x++) {
      if (xor(inRegion, region.plots.has(keyOf([x, y])))) {
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
        sum + countConvexCorners(plot, region.plots) + countConcaveCorners(plot, region.plots),
      0
    );

  function countConvexCorners([x, y]: Location, plots: Region['plots']): number {
    const { U, D, L, R } = getSurroundingKeys([x, y]);
    return [
      !plots.has(U) && !plots.has(R),
      !plots.has(U) && !plots.has(L),
      !plots.has(D) && !plots.has(R),
      !plots.has(D) && !plots.has(L)
    ].reduce((sum, check) => sum + (check ? 1 : 0), 0);
  }
  function countConcaveCorners([x, y]: Location, plots: Region['plots']): number {
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

const createRegion = (type: Region['type']): Region => ({
  type,
  plots: new Set<string>(),
  minX: Infinity,
  maxX: -1,
  minY: Infinity,
  maxY: -1
});

const emptySet = new Set<string>();
const visit = (
  [x, y]: Location,
  region: Region,
  map: MappedArea,
  visited: Array<Array<boolean>>
): Region['plots'] => {
  if (!isInMappedArea([x, y], map)) return emptySet;
  if (map[x][y] !== region.type) return emptySet;
  if (visited[x][y]) return emptySet;

  visited[x][y] = true;
  region.minX = x < region.minX ? x : region.minX;
  region.maxX = x > region.maxX ? x : region.maxX;
  region.minY = y < region.minY ? y : region.minY;
  region.maxY = y > region.maxY ? y : region.maxY;

  return new Set<string>([
    keyOf([x, y]),
    ...visit([x - 1, y], region, map, visited),
    ...visit([x + 1, y], region, map, visited),
    ...visit([x, y - 1], region, map, visited),
    ...visit([x, y + 1], region, map, visited)
  ]);
};

const isInMappedArea = ([x, y]: Location, map: MappedArea): boolean =>
  x >= 0 && x < map.length && y >= 0 && y < (map[0]?.length ?? 0);
