import type { ReadStream } from 'fs';

import { changeDirection, move, observe, OBSTRUCTION, parseFile, PATH, VISITED } from './utility';
import { Direction } from 'src/2024/06/types';

export async function guardGallivant(puzzleInputFile: ReadStream): Promise<number> {
  const { mappedArea, startingPosition } = await parseFile(puzzleInputFile);

  let counter = 1;
  let currentPosition = startingPosition;
  let direction: Direction = [-1, 0];
  let complete = false;
  for (;;) {
    const nextTile = observe(currentPosition, direction, mappedArea);
    switch (nextTile) {
      case null:
        complete = true;
        break;
      case OBSTRUCTION:
        direction = changeDirection(direction);
        break;
      case PATH:
        counter++;
      // Fall-through
      case VISITED:
        currentPosition = move(currentPosition, direction, mappedArea);
    }

    if (complete) break;
  }

  return counter;
}
