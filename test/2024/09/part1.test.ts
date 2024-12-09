import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { diskFragmenter } from 'src/2024/09/part1';

describe('AoC 2024 / Day 9: Disk Fragmenter / Part #1', () => {
  it('should return 1928 for the first puzzle input file', async () => {
    const result = await diskFragmenter(getFixtureStream('2024-09-test1.txt'));
    const expectedResult = 1928;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await diskFragmenter(getFixtureStream('2024-09-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
