import type { ReadStream } from 'fs';
import * as readline from 'readline';
import { Direction, DirectionTracker, MappedArea, Position } from 'src/2024/06/types';

export const GUARD = '^';
export const OBSTRUCTION = '#';
export const PATH = '.';
export const VISITED = 'X';

export const parseFile = async (puzzleInputFile: ReadStream) => {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const mappedArea: MappedArea = [];
  let startingPosition: Position = [0, 0];
  for await (const line of lineReader) {
    mappedArea.push(line.split(''));
    if (line.includes(GUARD)) {
      startingPosition = [mappedArea.length - 1, (line as string).indexOf(GUARD)];
    }
  }

  return { mappedArea, startingPosition };
};

export const observe = (currentPosition: Position, direction: Direction, mappedArea: MappedArea) => {
  const areaWidth = mappedArea[0].length;
  const watchedPosition: Position = [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];
  if (
    watchedPosition[0] < 0 ||
    watchedPosition[0] >= mappedArea.length ||
    watchedPosition[1] < 0 ||
    watchedPosition[1] >= areaWidth
  ) {
    return null;
  } else {
    return mappedArea[watchedPosition[0]][watchedPosition[1]];
  }
};

export const changeDirection = (currentDirection: Direction): Direction => {
  switch (`${currentDirection[0]},${currentDirection[1]}`) {
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

export const move = (currentPosition: Position, direction: Direction, mappedArea: MappedArea): Position => {
  const [x, y] = currentPosition;
  mappedArea[x][y] = VISITED;

  return [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];
};

export const trackDirectionAtPosition = (position: Position, direction: Direction, tracker: DirectionTracker) => {
  const [x, y] = position;

  tracker[x] ??= [];
  tracker[x][y] ??= new Set<string>();
  tracker[x][y].add(`${direction[0]},${direction[1]}`);
};
export const positionHasDirection = (position: Position, direction: Direction, tracker: DirectionTracker) => {
  const [x, y] = position;

  return tracker[x] && tracker[x][y] && tracker[x][y].has(`${direction[0]},${direction[1]}`);
};
