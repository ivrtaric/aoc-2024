import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { compact, defragment, defragmentWholeFiles, FREE_SPACE, parseInputFile } from './utility';
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

    const response = await parseInputFile(fileStream as ReadStream);
    expect(response).toEqual(testDiskMap);
  });
});

describe('defragment', () => {
  it('should properly defragment the test disk map', () => {
    const result = defragment(testDiskMap.map(([id, size]) => [id, size]));
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

describe('defragmentWholeFiles', () => {
  it('should properly defragment the test disk map', () => {
    const result = defragmentWholeFiles(testDiskMap.map(([id, size]) => [id, size]));
    expect(result).toEqual([
      [0, 2],
      [9, 2],
      [2, 1],
      [1, 3],
      [7, 3],
      [FREE_SPACE, 1],
      [4, 2],
      [FREE_SPACE, 1],
      [3, 3],
      [FREE_SPACE, 4],
      [5, 4],
      [FREE_SPACE, 1],
      [6, 4],
      [FREE_SPACE, 5],
      [8, 4],
      [FREE_SPACE, 2]
    ]);
  });
});

describe('compact', () => {
  it('should properly compact the defragmented test disk map by moving fragments', () => {
    const result = compact(defragment(testDiskMap.map(([id, size]) => [id, size])));
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
      [6, 2],
      [FREE_SPACE, 10]
    ]);
  });

  it('should properly defragment the test disk map by moving whole files', () => {
    const result = compact(defragmentWholeFiles(testDiskMap.map(([id, size]) => [id, size])));
    expect(result).toEqual([
      [0, 2],
      [9, 2],
      [2, 1],
      [1, 3],
      [7, 3],
      [FREE_SPACE, 1],
      [4, 2],
      [FREE_SPACE, 1],
      [3, 3],
      [FREE_SPACE, 4],
      [5, 4],
      [FREE_SPACE, 1],
      [6, 4],
      [FREE_SPACE, 5],
      [8, 4],
      [FREE_SPACE, 2]
    ]);
  });
});
