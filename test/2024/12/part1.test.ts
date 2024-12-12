import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { gardenGroups } from 'src/2024/12/part1';

describe('AoC 2024 / Day 12: Garden Groups / Part #1', () => {
  it('should return 1930 for the first puzzle input file and 25 iterations', async () => {
    const result = await gardenGroups(getFixtureStream('2024-12-test1.txt'));
    const expectedResult = 1930;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await gardenGroups(getFixtureStream('2024-12-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
