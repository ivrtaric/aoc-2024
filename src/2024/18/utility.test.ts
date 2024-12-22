import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { parseInputFile } from './utility';

describe('parseInputFile', () => {
  it('should return correct result for the input #1', async () => {
    const fileStream = Readable.from(
      ['Register A: 729', 'Register B: 0', 'Register C: 0', '', 'Program: 0,1,5,4,3,0'].join('\n')
    ) as ReadStream;

    const result = await parseInputFile(fileStream);
    expect(result).toEqual({
      A: 729n,
      B: 0n,
      C: 0n,
      program: [0, 1, 5, 4, 3, 0]
    });
  });
});
