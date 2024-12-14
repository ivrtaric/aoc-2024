import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { parseInputFile } from './utility';
import { PuzzleData } from './types';

const testInput1 = ['Button A: X+13, Y+7', 'Button B: X+26, Y+14', 'Prize: X=39, Y=21'].join('\n');
const testInput2 = [
  'Button A: X+94, Y+34',
  'Button B: X+22, Y+67',
  'Prize: X=8400, Y=5400',
  '',
  'Button A: X+26, Y+66',
  'Button B: X+67, Y+21',
  'Prize: X=12748, Y=12176',
  '',
  'Button A: X+17, Y+86',
  'Button B: X+84, Y+37',
  'Prize: X=7870, Y=6450',
  '',
  'Button A: X+69, Y+23',
  'Button B: X+27, Y+71',
  'Prize: X=18641, Y=10279'
].join('\n');

const testResult1: PuzzleData = {
  systems: [{ A: 13, B: 26, C: 39, D: 7, E: 14, F: 21 }]
};
const testResult2: PuzzleData = {
  systems: [
    { A: 94, B: 22, C: 8400, D: 34, E: 67, F: 5400 },
    { A: 26, B: 67, C: 12748, D: 66, E: 21, F: 12176 },
    { A: 17, B: 84, C: 7870, D: 86, E: 37, F: 6450 },
    { A: 69, B: 27, C: 18641, D: 23, E: 71, F: 10279 }
  ]
};

describe('parseInputFile', () => {
  it('should return correct result for a first input', async () => {
    const fileStream = Readable.from(testInput1) as ReadStream;

    const result = await parseInputFile(fileStream);
    expect(result).toEqual(testResult1);
  });
  it('should return correct result for a second input', async () => {
    const fileStream = Readable.from(testInput2) as ReadStream;

    const result = await parseInputFile(fileStream);
    expect(result).toEqual(testResult2);
  });
});

// describe('calculateButtonPresses', () => {
//   it('should run for the first input', () => {
//     expect(calculateButtonPresses(testResult1.systems[0])).toEqual(4);
//   });
// });
