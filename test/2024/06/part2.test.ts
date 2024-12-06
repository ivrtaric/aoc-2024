import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { guardGallivant } from 'src/2024/06/part2';

describe('AoC 2024 / Day 6: Guard Gallivant / Part #2', () => {
  it('should return 6 for the first puzzle input file', async () => {
    const result = await guardGallivant(getFixtureStream('2024-06-test1.txt'));
    const expectedResult = 6;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await guardGallivant(getFixtureStream('2024-06-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
