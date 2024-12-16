import type { ReadStream } from 'fs';

import type { Direction, Location } from '../common/types';
import { DirectionTracker } from './types';
import {
  changeDirection,
  markVisitedAndMove,
  observe,
  OBSTRUCTION,
  parseInputFile,
  PATH,
  positionHasDirection,
  trackDirectionAtPosition,
  traversePath,
  VISITED
} from './utility';

export async function guardGallivant(puzzleInputFile: ReadStream): Promise<number> {
  const { mappedArea, startingPosition } = await parseInputFile(puzzleInputFile);

  const { mappedArea: originalPath } = traversePath(
    mappedArea.map(line => [...line]),
    startingPosition
  );
  const visitedLocations = originalPath.flatMap((line, i) =>
    line
      .map((value, j) => (value === VISITED ? ([i, j] as Location) : undefined))
      .filter(x => x !== undefined)
  );

  let counter = 0;
  for (const [i, j] of visitedLocations) {
    if (mappedArea[i][j] !== PATH) continue;
    if (i === startingPosition[0] && j === startingPosition[1]) continue;

    const modifiedMappedArea = mappedArea.map(line => [...line]);
    modifiedMappedArea[i][j] = OBSTRUCTION;

    let currentPosition = startingPosition;
    let direction: Direction = [-1, 0];
    const directions: DirectionTracker = [];
    trackDirectionAtPosition(currentPosition, direction, directions);
    let isComplete = false;
    for (;;) {
      const currentTile = observe(currentPosition, [0, 0], modifiedMappedArea);
      if (currentTile === VISITED) {
        if (positionHasDirection(currentPosition, direction, directions)) {
          counter++;
          break;
        }
      }
      trackDirectionAtPosition(currentPosition, direction, directions);

      const nextTile = observe(currentPosition, direction, modifiedMappedArea);
      switch (nextTile) {
        case null:
          isComplete = true;
          break;
        case OBSTRUCTION:
          direction = changeDirection(direction);
          break;
        case VISITED:
        // Fall-through
        case PATH:
          currentPosition = markVisitedAndMove(currentPosition, direction, modifiedMappedArea);
      }

      if (isComplete) break;
    }
  }

  return counter;
}
