import { ReadStream } from 'fs';

import { keyOf, parseFile } from '../common/utilities';
import { Location, MappedArea } from '../common/types';
import { PuzzleData, Tiles } from './types';

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
  [x, y]: Location,
  distances: Map<string, number>,
  map: MappedArea<string | number>
): number => {
  if (map[x][y] !== Tiles.WALL) return 0;

  if (map[x - 1][y] !== Tiles.WALL && map[x + 1][y] !== Tiles.WALL) {
    const [left, right] = [distances.get(keyOf([x - 1, y]))!, distances.get(keyOf([x + 1, y]))!];
    const [min, max] = left < right ? [left, right] : [right, left];
    return max - (min + 2);
  }

  if (map[x][y - 1] !== Tiles.WALL && map[x][y + 1] !== Tiles.WALL) {
    const [left, right] = [distances.get(keyOf([x, y - 1]))!, distances.get(keyOf([x, y + 1]))!];
    const [min, max] = left < right ? [left, right] : [right, left];
    return max - (min + 2);
  }

  return 0;
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
