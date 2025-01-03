import { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';
import { parseLine } from './utility';

export async function historianHysteria(puzzleInputFile: ReadStream): Promise<number> {
  const leftLocations = new Set<number>();
  const locationTracker = new Map<number, { appearsInLeft: number; appearsInRight: number }>();

  await parseFile(puzzleInputFile, line => {
    const { left, right } = parseLine(line);
    leftLocations.add(left);

    const leftTracker = locationTracker.get(left) ?? { appearsInLeft: 0, appearsInRight: 0 };
    leftTracker.appearsInLeft++;
    locationTracker.set(left, leftTracker);

    const rightTracker = locationTracker.get(right) ?? { appearsInLeft: 0, appearsInRight: 0 };
    rightTracker.appearsInRight++;
    locationTracker.set(right, rightTracker);
  });

  return [...leftLocations].reduce((sum, left) => {
    const leftTracker = locationTracker.get(left);
    return leftTracker
      ? sum + Math.abs(left * leftTracker.appearsInRight * leftTracker.appearsInLeft)
      : sum;
  }, 0);
}
