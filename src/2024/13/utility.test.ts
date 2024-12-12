import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { parseInputFile } from './utility';

const testInput1 = '';
const testInput2 = '';

const testResult1 = '';
const testResult2 = '';

describe('parseFile', () => {
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
