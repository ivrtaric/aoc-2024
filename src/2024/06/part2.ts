import type { ReadStream } from 'fs';
import {
  changeDirection,
  move,
  observe,
  OBSTRUCTION,
  parseFile,
  PATH,
  positionHasDirection,
  trackDirectionAtPosition,
  VISITED
} from './utility';
import { Direction, DirectionTracker } from 'src/2024/06/types';

export async function guardGallivant(puzzleInputFile: ReadStream): Promise<number> {
  const { mappedArea, startingPosition } = await parseFile(puzzleInputFile);

  let counter = 0;
  for (let i = 0; i < mappedArea.length; i++) {
    const tiles = mappedArea[i];
    for (let j = 0; j < tiles.length; j++) {
      if (tiles[j] !== PATH) continue;

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
            currentPosition = move(currentPosition, direction, modifiedMappedArea);
        }

        if (isComplete) break;
      }
    }
  }

  return counter;
}
