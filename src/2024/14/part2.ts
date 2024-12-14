import { ReadStream } from 'fs';

import type { Space } from '../common/types';
import { keyOf } from '../common/utilities';

import { endingPosition, parseInputFile } from './utility';
import { SECONDS_CHECK_LIMIT, WATCHED_REGION_SIZE } from './types';

export async function restroomRedoubt(puzzleInputFile: ReadStream, space: Space): Promise<number> {
  const robots = await parseInputFile(puzzleInputFile);

  let second = 0;
  for (;;) {
    robots.forEach(r => {
      r.position = endingPosition(r, space, 1);
    });

    const distinctPositions = new Set<string>(robots.map(r => keyOf(r.position)));
    const regions = findRegions(distinctPositions);

    second++;
    if (regions.length > 0) {
      return second;
    } else if (second > SECONDS_CHECK_LIMIT) {
      return -1;
    }
  }
}

const findRegions = (positions: Set<string>): Array<Set<string>> => {
  const regions: Array<Set<string>> = [];
  for (const position of positions) {
    const region = visit(position, positions);
    if (region.size > WATCHED_REGION_SIZE) regions.push(region);
  }

  return regions;
};

const emptySet = new Set<string>();
const visit = (position: string, positions: Set<string>): Set<string> => {
  if (!positions.has(position)) return emptySet;

  positions.delete(position);
  const [x, y] = position.split(',').map(Number);
  return new Set<string>([
    position,
    ...visit(keyOf([x - 1, y]), positions),
    ...visit(keyOf([x + 1, y]), positions),
    ...visit(keyOf([x, y - 1]), positions),
    ...visit(keyOf([x, y + 1]), positions)
  ]);
};
