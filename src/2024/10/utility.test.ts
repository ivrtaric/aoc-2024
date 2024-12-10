import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { parseFile, search } from './utility';
import { Location, TopographicMap } from './types';

const testInput = [
  '89010123',
  '78121874',
  '87430965',
  '96549874',
  '45678903',
  '32019012',
  '01329801',
  '10456732'
].join('\n');
const expectedMap: TopographicMap = [
  [8, 9, 0, 1, 0, 1, 2, 3],
  [7, 8, 1, 2, 1, 8, 7, 4],
  [8, 7, 4, 3, 0, 9, 6, 5],
  [9, 6, 5, 4, 9, 8, 7, 4],
  [4, 5, 6, 7, 8, 9, 0, 3],
  [3, 2, 0, 1, 9, 0, 1, 2],
  [0, 1, 3, 2, 9, 8, 0, 1],
  [1, 0, 4, 5, 6, 7, 3, 2]
];
const expectedStartingPositions: Array<Location> = [
  [0, 2],
  [0, 4],
  [2, 4],
  [4, 6],
  [5, 2],
  [5, 5],
  [6, 0],
  [6, 6],
  [7, 1]
];

describe('parseFile', () => {
  it('should return correct disk map for a specified input', async () => {
    const fileStream = Readable.from(testInput);

    const { startingPositions, map } = await parseFile(fileStream as ReadStream);
    expect(map).toEqual(expectedMap);
    expect(startingPositions).toEqual(expectedStartingPositions);
  });
});

describe('search', () => {
  (
    [
      [5, [0, 2]],
      [6, [0, 4]],
      [5, [2, 4]],
      [3, [4, 6]],
      [1, [5, 2]],
      [3, [5, 5]],
      [5, [6, 0]],
      [3, [6, 6]],
      [5, [7, 1]]
    ] as Array<[number, Location]>
  ).map(([score, location]) =>
    it(`should return ${score} for ${location}`, () => {
      expect(search(location, null, expectedMap).size).toEqual(score);
    })
  );
});
