import type { ReadStream } from 'fs';

import type { Location } from '../common/types';
import { keyOf, parseFile } from '../common/utilities';

import type { PuzzleInput, TopographicMap } from './types';

export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<PuzzleInput> => {
  [];
  const startingPositions: Array<Location> = [];
  let currentIndex = 0;

  const topographicMap: TopographicMap = await parseFile<Array<number>>(puzzleInputFile, line => {
    const currentLine = line.split('').map(n => Number(n));
    currentLine.forEach((n, i) => {
      if (n === 0) startingPositions.push([currentIndex, i]);
    });
    currentIndex++;

    return currentLine;
  });

  return { map: topographicMap, startingPositions };
};

const emptySet = new Set<string>();
export const findScore = (position: Location, map: TopographicMap) =>
  search<Set<string>>(position, null, map, {
    validValue: (l: Location) => new Set<string>([keyOf(l)]),
    invalidValue: (l: Location) => emptySet,
    findSubPath: (
      [x, y]: Location,
      map: TopographicMap,
      configuration: SearchConfiguration<Set<string>>
    ) =>
      new Set<string>(
        [
          ...search([x - 1, y], [x, y], map, configuration),
          ...search([x + 1, y], [x, y], map, configuration),
          ...search([x, y - 1], [x, y], map, configuration),
          ...search([x, y + 1], [x, y], map, configuration)
        ].filter(x => x !== null)
      )
  });

export const findRating = (position: Location, map: TopographicMap) =>
  search<number>(position, null, map, {
    validValue: (l: Location) => 1,
    invalidValue: (l: Location) => 0,
    findSubPath: (
      [x, y]: Location,
      map: TopographicMap,
      configuration: SearchConfiguration<number>
    ) =>
      [
        search([x - 1, y], [x, y], map, configuration),
        search([x + 1, y], [x, y], map, configuration),
        search([x, y - 1], [x, y], map, configuration),
        search([x, y + 1], [x, y], map, configuration)
      ].reduce((sum, i) => sum + i, 0)
  });

type SearchConfiguration<T> = {
  validValue: (l: Location) => T;
  invalidValue: (l: Location) => T;
  findSubPath: (l: Location, m: TopographicMap, c: SearchConfiguration<T>) => T;
};
const search = <T>(
  position: Location,
  previousPosition: Location | null,
  map: TopographicMap,
  configuration: SearchConfiguration<T>
): T => {
  const { validValue, invalidValue, findSubPath } = configuration;
  if (!isInMappedArea(position, map)) return invalidValue(position);

  const [x, y] = position;
  if (previousPosition === null) {
    return map[x][y] === 0 ? findSubPath(position, map, configuration) : invalidValue(position);
  } else {
    const [px, py] = previousPosition;

    if (map[x][y] === 9 && map[px][py] === 8) return validValue(position);
    if (map[x][y] - map[px][py] !== 1) return invalidValue(position);

    return findSubPath(position, map, configuration);
  }
};

const isInMappedArea = ([x, y]: Location, map: TopographicMap): boolean =>
  x >= 0 && x < map.length && y >= 0 && y < (map[0]?.length ?? 0);
