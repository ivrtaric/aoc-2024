import type { ReadStream } from 'fs';

import { keyOf, parseFile } from '../common/utilities';
import type { Location, NumberPair, Space } from '../common/types';

import { CountsPerQuadrant, Robot, WATCHED_REGION_SIZE } from './types';

const ROBOT_REGEX = /^p=(?<x>\d+),(?<y>\d+)\s+v=(?<dx>-?\d+),(?<dy>-?\d+)$/;
export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<Array<Robot>> =>
  parseFile<Robot>(puzzleInputFile, line => {
    const result = ROBOT_REGEX.exec(line);
    if (!result?.groups) throw new Error(`Could not parse line "${line}"`);

    return {
      position: [Number(result.groups.x), Number(result.groups.y)],
      velocity: [Number(result.groups.dx), Number(result.groups.dy)]
    };
  });

export const endingPosition = (robot: Robot, space: Space, seconds: number) => {
  let currentPosition = robot.position;
  for (let i = 0; i < seconds; i++) {
    currentPosition = nextPosition(currentPosition, robot.velocity, space);
  }
  return currentPosition;
};

export const nextPosition = (
  [x, y]: Location,
  [dx, dy]: NumberPair,
  { width, height }: Space
): Location => {
  const nextLocation: Location = [x + dx, y + dy];
  if (nextLocation[0] >= width) {
    nextLocation[0] -= width;
  } else if (nextLocation[0] < 0) {
    nextLocation[0] += width;
  }
  if (nextLocation[1] >= height) {
    nextLocation[1] -= height;
  } else if (nextLocation[1] < 0) {
    nextLocation[1] += height;
  }

  return nextLocation;
};

export const splitInQuadrants = (positions: Array<Location>, space: Space): CountsPerQuadrant => {
  const [halfWidth, halfHeight] = [Math.floor(space.width / 2), Math.floor(space.height / 2)];

  return positions.reduce(
    (counts, [x, y]) => {
      if (x < halfWidth && y < halfHeight) counts.Q1++;
      if (x > halfWidth && y < halfHeight) counts.Q2++;
      if (x < halfWidth && y > halfHeight) counts.Q3++;
      if (x > halfWidth && y > halfHeight) counts.Q4++;
      return counts;
    },
    { Q1: 0, Q2: 0, Q3: 0, Q4: 0 }
  );
};

export const findRegions = (positions: Set<string>): Array<Set<string>> => {
  const regions: Array<Set<string>> = [];
  for (const position of positions) {
    const region = visit(position, positions);
    if (region.size > WATCHED_REGION_SIZE) regions.push(region);
  }

  return regions;
};

export const printRegions = (regions: Array<Set<string>>, space: Space): void => {
  for (let y = 0; y < space.height; y++) {
    const line = [];
    for (let x = 0; x < space.width; x++) {
      const position = keyOf([x, y]);
      line.push(regions.reduce((has, r) => has || r.has(position), false) ? '*' : ' ');
    }
    console.log(line.join(''));
  }
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
