import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { ceresSearch } from 'src/2024/04/part2';

describe('AoC 2024 / Day 2: Red-Nosed Reports / Part #1', () => {
  it('should return 9 for the first puzzle input file', async () => {
    const result = await ceresSearch(getFixtureStream('2024-04-test1.txt'));
    const expectedResult = 9;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await ceresSearch(getFixtureStream('2024-04-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
