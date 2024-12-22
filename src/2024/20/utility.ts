import { ReadStream } from 'fs';

import { keyOf, parseFile } from '../common/utilities';
import { Location, MappedArea } from '../common/types';
import { CHEAT_DURATION, PuzzleData, Tiles } from './types';

export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<PuzzleData> => {
  let start: Location = [0, 0];
  let end: Location = [0, 0];

  const map = await parseFile(puzzleInputFile, (line, row) => {
    if (line.includes(Tiles.START)) {
      start = [row, line.indexOf(Tiles.START)];
    }
    if (line.includes(Tiles.END)) {
      end = [row, line.indexOf(Tiles.END)];
    }
    return line.split('');
  });

  return { start, end, map };
};

export const findShortestPath = (
  start: Location,
  end: Location,
  map: MappedArea<string | number>
) => {
  const visited = new Set<string>();

  const startKey = keyOf(start);
  const endKey = keyOf(end);

  const distances = new Map<string, number>([[startKey, 0]]);
  const previous = new Map<string, string>([[startKey, '']]);
  if (startKey === endKey) return { distances, previous };

  for (;;) {
    let currentDistance = Infinity;
    let currentKey = '';
    for (const [key, distance] of distances) {
      if (visited.has(key) || distance >= currentDistance) continue;
      currentDistance = distance;
      currentKey = key;
    }
    if (currentKey === endKey || !currentKey) return { distances, previous };

    visited.add(currentKey);

    for (const neighbour of findNeighbours(currentKey, map)) {
      if (visited.has(neighbour)) continue;
      const targetDistance = currentDistance + 1;

      if (targetDistance <= (distances.get(neighbour) ?? Infinity)) {
        distances.set(neighbour, targetDistance);
        previous.set(neighbour, currentKey);
      }
    }
  }
};

export const calculateTimeSavedByCheat = (
  [x1, y1]: Location,
  [x2, y2]: Location,
  distances: Map<string, number>,
  map: MappedArea<string | number>
): number => {
  if (map[x1][y1] === Tiles.WALL || map[x2][y2] === Tiles.WALL) {
    return 0;
  }

  const [left, right] = [distances.get(keyOf([x1, y1]))!, distances.get(keyOf([x2, y2]))!];
  const [min, max] = left < right ? [left, right] : [right, left];
  return max - (min + calculateCheatDuration([x1, y1], [x2, y2]));
};

export const canUseCheat = (
  [sx, sy]: Location,
  [ex, ey]: Location,
  map: MappedArea<string | number>
) =>
  map[sx][sy] !== Tiles.WALL &&
  map[ex][ey] !== Tiles.WALL &&
  hasWallsBetween([sx, sy], [ex, ey], map) &&
  calculateCheatDuration([sx, sy], [ex, ey]) <= CHEAT_DURATION;

const calculateCheatDuration = ([sx, sy]: Location, [ex, ey]: Location) =>
  Math.abs(ex - sx) + Math.abs(ey - sy);

const hasWallsBetween = (
  [sx, sy]: Location,
  [ex, ey]: Location,
  map: MappedArea<string | number>
) => {
  const [minX, maxX] = sx < ex ? [sx, ex] : [ex, sx];
  const [minY, maxY] = sy < ey ? [sy, ey] : [ey, sy];

  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      if (map[i][j] === Tiles.WALL) return true;
    }
  }

  return false;
};

const findNeighbours = (key: string, map: MappedArea<string | number>) => {
  const [x, y] = key.split(',').map(Number);
  return (
    [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1]
    ] as Array<Location>
  )
    .filter(([a, b]) => isInMappedArea([a, b], map) && map[a][b] !== Tiles.WALL)
    .map(keyOf);
};
const isInMappedArea = ([x, y]: Location, map: MappedArea<string | number>) =>
  x >= 0 && x < map.length && y >= 0 && y < map[0].length;
