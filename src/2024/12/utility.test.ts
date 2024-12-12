import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { findArea, findPerimeter, findRegions, findSides, parseFile } from './utility';
import { Region } from './types';

describe('parseFile', () => {
  it('should return correct result for a first input', async () => {
    const fileStream = Readable.from(testInput1);

    const result = await parseFile(fileStream as ReadStream);
    expect(result).toEqual(testResult1);
  });
  it('should return correct result for a second input', async () => {
    const fileStream = Readable.from(testInput2);

    const result = await parseFile(fileStream as ReadStream);
    expect(result).toEqual(testResult2);
  });
});

describe('findRegions', () => {
  it('should return correct regions for a first input', () => {
    expect(findRegions(testResult1)).toEqual(testRegions1);
  });
  it('should return correct regions for a second input', () => {
    expect(findRegions(testResult2)).toEqual(testRegions2);
  });
});

describe('findArea', () => {
  (
    [
      [4, testRegions1[0]],
      [4, testRegions1[1]],
      [4, testRegions1[2]],
      [1, testRegions1[3]],
      [3, testRegions1[4]],
      [21, testRegions2[0]],
      [1, testRegions2[1]],
      [1, testRegions2[2]],
      [1, testRegions2[3]],
      [1, testRegions2[4]],
      [17, testRegions3[0]],
      [4, testRegions3[1]],
      [4, testRegions3[2]]
    ] as Array<[number, Region]>
  ).forEach(([area, region]) =>
    it(`should return ${area} for Region ${JSON.stringify(region)}`, () => {
      expect(findArea(region)).toEqual(area);
    })
  );
});

describe('findPerimeter', () => {
  (
    [
      [10, testRegions1[0]],
      [8, testRegions1[1]],
      [10, testRegions1[2]],
      [4, testRegions1[3]],
      [8, testRegions1[4]],
      [36, testRegions2[0]],
      [4, testRegions2[1]],
      [4, testRegions2[2]],
      [4, testRegions2[3]],
      [4, testRegions2[4]]
    ] as Array<[number, Region]>
  ).forEach(([perimeter, region]) =>
    it(`should return ${perimeter} for Region ${JSON.stringify(region)}`, () => {
      expect(findPerimeter(region)).toEqual(perimeter);
    })
  );
});

describe('findSides', () => {
  (
    [
      [4, testRegions1[0]],
      [4, testRegions1[1]],
      [8, testRegions1[2]],
      [4, testRegions1[3]],
      [4, testRegions1[4]],
      [12, testRegions3[0]],
      [4, testRegions3[1]],
      [4, testRegions3[2]]
    ] as Array<[number, Region]>
  ).forEach(([perimeter, region]) =>
    it(`should return ${perimeter} for Region ${JSON.stringify(region)}`, () => {
      expect(findSides(region)).toEqual(perimeter);
    })
  );
});

const testInput1 = ['AAAA', 'BBCD', 'BBCC', 'EEEC'].join('\n');
const testResult1 = [
  ['A', 'A', 'A', 'A'],
  ['B', 'B', 'C', 'D'],
  ['B', 'B', 'C', 'C'],
  ['E', 'E', 'E', 'C']
];
const testRegions1: Array<Region> = [
  {
    type: 'A',
    plots: new Set(['0,0', '0,1', '0,2', '0,3']),
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 3
  },
  {
    type: 'B',
    plots: new Set(['1,0', '2,0', '2,1', '1,1']),
    minX: 1,
    maxX: 2,
    minY: 0,
    maxY: 1
  },
  {
    type: 'C',
    plots: new Set(['1,2', '2,2', '2,3', '3,3']),
    minX: 1,
    maxX: 3,
    minY: 2,
    maxY: 3
  },
  {
    type: 'D',
    plots: new Set(['1,3']),
    minX: 1,
    maxX: 1,
    minY: 3,
    maxY: 3
  },
  {
    type: 'E',
    plots: new Set(['3,0', '3,1', '3,2']),
    minX: 3,
    maxX: 3,
    minY: 0,
    maxY: 2
  }
];
const testInput2 = ['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO'].join('\n');
const testResult2 = [
  ['O', 'O', 'O', 'O', 'O'],
  ['O', 'X', 'O', 'X', 'O'],
  ['O', 'O', 'O', 'O', 'O'],
  ['O', 'X', 'O', 'X', 'O'],
  ['O', 'O', 'O', 'O', 'O']
];
const testRegions2: Array<Region> = [
  {
    type: 'O',
    minX: 0,
    maxX: 4,
    minY: 0,
    maxY: 4,
    plots: new Set([
      '0,0',
      '0,1',
      '0,2',
      '0,3',
      '0,4',
      '1,0',
      '1,2',
      '1,4',
      '2,0',
      '2,1',
      '2,2',
      '2,3',
      '2,4',
      '3,0',
      '3,2',
      '3,4',
      '4,0',
      '4,1',
      '4,2',
      '4,3',
      '4,4'
    ])
  },
  { type: 'X', plots: new Set(['1,1']), minX: 1, maxX: 1, minY: 1, maxY: 1 },
  { type: 'X', plots: new Set(['1,3']), minX: 1, maxX: 1, minY: 3, maxY: 3 },
  { type: 'X', plots: new Set(['3,1']), minX: 3, maxX: 3, minY: 1, maxY: 1 },
  { type: 'X', plots: new Set(['3,3']), minX: 3, maxX: 3, minY: 3, maxY: 3 }
];
const testRegions3: Array<Region> = [
  {
    type: 'E',
    minX: 0,
    maxX: 4,
    minY: 0,
    maxY: 4,
    plots: new Set([
      '0,0',
      '0,1',
      '0,2',
      '0,3',
      '0,4',
      '1,0',
      '2,0',
      '2,1',
      '2,2',
      '2,3',
      '2,4',
      '3,0',
      '4,0',
      '4,1',
      '4,2',
      '4,3',
      '4,4'
    ])
  },
  { type: 'X', plots: new Set(['1,1', '1,2', '1,3', '1,4']), minX: 1, maxX: 1, minY: 1, maxY: 4 },
  { type: 'X', plots: new Set(['3,1', '3,2', '3,3', '3,4']), minX: 3, maxX: 3, minY: 1, maxY: 4 }
];
