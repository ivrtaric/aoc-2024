import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';

import { ReadStream } from 'fs';
import { defragment, FREE_SPACE, parseFile } from './utility';
import { DiskMap } from './types';

const testInput = '2333133121414131402';
const testDiskMap: DiskMap = [
  [0, 2],
  [FREE_SPACE, 3],
  [1, 3],
  [FREE_SPACE, 3],
  [2, 1],
  [FREE_SPACE, 3],
  [3, 3],
  [FREE_SPACE, 1],
  [4, 2],
  [FREE_SPACE, 1],
  [5, 4],
  [FREE_SPACE, 1],
  [6, 4],
  [FREE_SPACE, 1],
  [7, 3],
  [FREE_SPACE, 1],
  [8, 4],
  [9, 2]
];

describe('parseFile', () => {
  it('should return correct disk map for a specified input', async () => {
    const fileStream = Readable.from(testInput);

    const response = await parseFile(fileStream as ReadStream);
    expect(response).toEqual(testDiskMap);
  });
});

describe('defragment', () => {
  it('should properly defragment the test disk map', () => {
    const result = defragment(testDiskMap);
    expect(result).toEqual([
      [0, 2],
      [9, 2],
      [8, 1],
      [1, 3],
      [8, 3],
      [2, 1],
      [7, 3],
      [3, 3],
      [6, 1],
      [4, 2],
      [6, 1],
      [5, 4],
      [6, 1],
      [6, 1],
      [FREE_SPACE, 1],
      [FREE_SPACE, 3],
      [FREE_SPACE, 1],
      [FREE_SPACE, 3],
      [FREE_SPACE, 2]
    ]);
  });
});
