import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import type { Location, NumberPair, Space } from '../common/types';
import { endingPosition, nextPosition, parseInputFile } from './utility';
import type { Robot } from './types';

describe('parseInputFile', () => {
  it('should return correct result for a first input', async () => {
    const fileStream = Readable.from(testInput1);

    const result = await parseInputFile(fileStream as ReadStream);
    expect(result).toEqual(testResult1);
  });
});

describe('nextPosition', () => {
  (
    [
      [
        [2, 4],
        [2, -3],
        [4, 1]
      ],
      [
        [4, 1],
        [2, -3],
        [6, 5]
      ],
      [
        [6, 5],
        [2, -3],
        [8, 2]
      ],
      [
        [8, 2],
        [2, -3],
        [10, 6]
      ],
      [
        [10, 6],
        [2, -3],
        [1, 3]
      ]
    ] as Array<[Location, NumberPair, Location]>
  ).forEach(([starting, velocity, expected]) =>
    it(`should return ${expected} for starting position ${starting} and velocity ${velocity}`, () => {
      expect(nextPosition(starting, velocity, testSpace)).toEqual(expected);
    })
  );
});

describe('endingPosition', () => {
  it(`should return [1, 3] for start: [2, 4], velocity: [2, -3], seconds: 5`, () => {
    expect(endingPosition({ position: [2, 4], velocity: [2, -3] }, testSpace, 5)).toEqual([1, 3]);
  });
});

const testSpace: Space = { width: 11, height: 7 };
const testInput1 = [
  'p=0,4 v=3,-3',
  'p=6,3 v=-1,-3',
  'p=10,3 v=-1,2',
  'p=2,0 v=2,-1',
  'p=0,0 v=1,3',
  'p=3,0 v=-2,-2',
  'p=7,6 v=-1,-3',
  'p=3,0 v=-1,-2',
  'p=9,3 v=2,3',
  'p=7,3 v=-1,2',
  'p=2,4 v=2,-3',
  'p=9,5 v=-3,-3'
].join('\n');
const testResult1: Array<Robot> = [
  { position: [0, 4], velocity: [3, -3] },
  { position: [6, 3], velocity: [-1, -3] },
  { position: [10, 3], velocity: [-1, 2] },
  { position: [2, 0], velocity: [2, -1] },
  { position: [0, 0], velocity: [1, 3] },
  { position: [3, 0], velocity: [-2, -2] },
  { position: [7, 6], velocity: [-1, -3] },
  { position: [3, 0], velocity: [-1, -2] },
  { position: [9, 3], velocity: [2, 3] },
  { position: [7, 3], velocity: [-1, 2] },
  { position: [2, 4], velocity: [2, -3] },
  { position: [9, 5], velocity: [-3, -3] }
];
