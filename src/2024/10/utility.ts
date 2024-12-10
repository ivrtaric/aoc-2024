import type { ReadStream } from 'fs';
import * as readline from 'readline';

import { Location, PuzzleInput, TopographicMap } from './types';

export const parseFile = async (puzzleInputFile: ReadStream): Promise<PuzzleInput> => {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const topographicMap: TopographicMap = [];
  const startingPositions: Array<Location> = [];
  let currentIndex = 0;
  for await (const line of lineReader) {
    const currentLine = line.split('').map(n => Number(n));
    topographicMap.push(currentLine);
    currentLine.forEach((n, i) => {
      if (n === 0) startingPositions.push([currentIndex, i]);
    });
    currentIndex++;
  }

  return { map: topographicMap, startingPositions };
};

const emptySet = new Set<string>();
export const search = (
  position: Location,
  previousPosition: Location | null,
  map: TopographicMap
): Set<string> => {
  if (!isInMappedArea(position, map)) return emptySet;

  const [x, y] = position;
  if (previousPosition !== null) {
    const [px, py] = previousPosition;

    if (map[x][y] === 9 && map[px][py] === 8) return new Set([`${x},${y}`]);
    if (map[x][y] - map[px][py] !== 1) return emptySet;

    return findSubPathScore(position, map);
  } else {
    return map[x][y] === 0 ? findSubPathScore(position, map) : emptySet;
  }
};

const findSubPathScore = (position: Location, map: TopographicMap): Set<string> => {
  const [x, y] = position;
  return new Set<string>(
    [
      ...search([x - 1, y], position, map),
      ...search([x + 1, y], position, map),
      ...search([x, y - 1], position, map),
      ...search([x, y + 1], position, map)
    ].filter(x => x !== null)
  );
};

const isInMappedArea = ([x, y]: Location, map: TopographicMap): boolean =>
  x >= 0 && x < map.length && y >= 0 && y < (map[0]?.length ?? 0);
