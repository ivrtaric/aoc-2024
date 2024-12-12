import type { ReadStream } from 'fs';

import type { Direction, DirectionTracker } from './types';
import type { Location, MappedArea } from '../common/types';

import { keyOf, parseFile } from '../common/utilities';

export const GUARD = '^';
export const OBSTRUCTION = '#';
export const PATH = '.';
export const VISITED = 'X';

export const parseInputFile = async (puzzleInputFile: ReadStream) => {
  let startingPosition: Location = [0, 0];

  const mappedArea: MappedArea = await parseFile(puzzleInputFile, line => line.split(''));
  mappedArea.forEach((row, i) => {
    if (row.includes(GUARD)) startingPosition = [i, row.indexOf(GUARD)];
  });

  return { mappedArea, startingPosition };
};

export const traversePath = (mappedArea: MappedArea, startingPosition: Location) => {
  let visitedPositionCount = 1;
  let currentPosition = startingPosition;
  let direction: Direction = [-1, 0];
  let complete = false;
  while (!complete) {
    switch (observe(currentPosition, direction, mappedArea)) {
      case null:
        markVisitedAndMove(currentPosition, direction, mappedArea);
        complete = true;
        break;
      case OBSTRUCTION:
        direction = changeDirection(direction);
        break;
      case PATH:
        visitedPositionCount++;
      // Fall-through
      case VISITED:
        currentPosition = markVisitedAndMove(currentPosition, direction, mappedArea);
    }
  }

  return { mappedArea, visitedPositionCount };
};

export const observe = ([x, y]: Location, [dx, dy]: Direction, mappedArea: MappedArea) => {
  const [ox, oy] = [x + dx, y + dy];
  return isInMappedArea([ox, oy], mappedArea) ? mappedArea[ox][oy] : null;
};

const isInMappedArea = ([x, y]: Location, mappedArea: MappedArea) =>
  x >= 0 && x < mappedArea.length && y >= 0 && y < mappedArea[0].length;

export const changeDirection = (direction: Direction): Direction => {
  switch (keyOf(direction)) {
    case '-1,0':
      return [0, 1];
    case '0,1':
      return [1, 0];
    case '1,0':
      return [0, -1];
    case '0,-1':
      return [-1, 0];
    default:
      throw new Error('Unreachable');
  }
};

export const markVisitedAndMove = (
  [x, y]: Location,
  [dx, dy]: Direction,
  mappedArea: MappedArea
): Location => {
  mappedArea[x][y] = VISITED;
  return [x + dx, y + dy];
};

export const trackDirectionAtPosition = (
  [x, y]: Location,
  direction: Direction,
  tracker: DirectionTracker
) => {
  tracker[x] ??= [];
  tracker[x][y] ??= new Set<string>();
  tracker[x][y].add(keyOf(direction));
};
export const positionHasDirection = (
  [x, y]: Location,
  direction: Direction,
  tracker: DirectionTracker
) => Boolean(tracker[x] && tracker[x][y] && tracker[x][y].has(keyOf(direction)));
