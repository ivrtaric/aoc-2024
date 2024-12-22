import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { parseInputFile } from './utility';

describe('parseInputFile', () => {
  it('should return correct result for the input #1', async () => {
    const fileStream = Readable.from(
      [
        'r, wr, b, g, bwu, rb, gb, br',
        '',
        'brwrr',
        'bggr',
        'gbbr',
        'rrbgbr',
        'ubwu',
        'bwurrg',
        'brgr',
        'bbrgwb'
      ].join('\n')
    ) as ReadStream;

    const result = await parseInputFile(fileStream);
    expect(result).toEqual({
      patterns: new Map<string, Array<string>>([
        ['b', ['bwu', 'br', 'b']],
        ['g', ['gb', 'g']],
        ['r', ['rb', 'r']],
        ['w', ['wr']]
      ]),
      designs: ['brwrr', 'bggr', 'gbbr', 'rrbgbr', 'ubwu', 'bwurrg', 'brgr', 'bbrgwb']
    });
  });
});
