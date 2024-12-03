import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { mullItOver } from 'src/2024/03/part2';

describe('AoC 2024 / Day 3: Mull It Over / Part #2', () => {
  it('should return 48 for the first puzzle input file', async () => {
    const result = await mullItOver(getFixtureStream('2024-03-test1-part2.txt'));
    const expectedResult = 48;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await mullItOver(getFixtureStream('2024-03-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
