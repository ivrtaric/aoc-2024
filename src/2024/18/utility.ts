import { ReadStream } from 'fs';
import { keyOf, parseFile } from '../common/utilities';
import { Location } from '../common/types';
import { CORRUPTED, Memory } from './types';

export const createMemory = (maxIndex: number) =>
  Array(maxIndex + 1)
    .fill(0)
    .map(_ => Array(maxIndex + 1).fill(0));

export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<Array<Location>> =>
  parseFile<Location>(puzzleInputFile, line => line.split(',').map(Number) as Location);

export const findShortestPathLength = (start: Location, end: Location, memory: Memory): number => {
  const { distances } = findShortestPath(start, end, memory);
  const endKey = keyOf(end);
  if (!distances.has(endKey) || !distances.get(endKey) || distances.get(endKey) === Infinity) {
    throw new Error(`No path available from ${keyOf(start)} to ${endKey}`);
  }

  return distances.get(endKey)!;
};

export const findShortestPath = (
  start: Location,
  end: Location,
  memory: Memory
): { distances: Map<string, number>; previous: Map<string, string> } => {
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

    for (const neighbour of findNeighbours(currentKey, memory)) {
      if (visited.has(neighbour)) continue;
      const targetDistance = currentDistance + 1;

      if (targetDistance <= (distances.get(neighbour) ?? Infinity)) {
        distances.set(neighbour, targetDistance);
        previous.set(neighbour, currentKey);
      }
    }
  }
};

const findNeighbours = (key: string, memory: Memory) => {
  const [x, y] = key.split(',').map(Number);
  return (
    [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1]
    ] as Array<Location>
  )
    .filter(([a, b]) => isInMemory([a, b], memory) && memory[a][b] !== CORRUPTED)
    .map(keyOf);
};
const isInMemory = ([x, y]: Location, memory: Memory) =>
  x >= 0 && x < memory.length && y >= 0 && y < memory[0].length;
