import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { parseInputFile } from './utility';
import type { Location } from '../common/types';

const testInput1 = [
  '............',
  '........0...',
  '.....0......',
  '.......0....',
  '....0.......',
  '......A.....',
  '............',
  '............',
  '........A...',
  '.........A..',
  '............',
  '............'
].join('\n');

describe('parseFile', () => {
  it('should return correct result for a first input', async () => {
    const fileStream = Readable.from(testInput1);

    const { width, height, antennas } = await parseInputFile(fileStream as ReadStream);
    expect(width).toEqual(12);
    expect(height).toEqual(12);
    expect(antennas).toEqual(
      new Map<string, Array<Location>>([
        [
          '0',
          [
            [1, 8],
            [2, 5],
            [3, 7],
            [4, 4]
          ]
        ],
        [
          'A',
          [
            [5, 6],
            [8, 8],
            [9, 9]
          ]
        ]
      ])
    );
  });
});
