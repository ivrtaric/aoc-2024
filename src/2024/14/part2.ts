import { ReadStream } from 'fs';

import type { Space } from '../common/types';
import { keyOf } from '../common/utilities';

import { endingPosition, findRegions, parseInputFile } from './utility';
import { SECONDS_CHECK_LIMIT } from './types';

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
    if (regions.length) {
      // printRegions(regions, space);
      return second;
    } else if (second > SECONDS_CHECK_LIMIT) {
      return -1;
    }
  }
}
