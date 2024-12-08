import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { resonantCollinearity } from 'src/2024/08/part1';

describe('AoC 2024 / Day 8: Resonant Collinearity / Part #1', () => {
  it('should return 14 for the first puzzle input file', async () => {
    const result = await resonantCollinearity(getFixtureStream('2024-08-test1.txt'));
    const expectedResult = 14;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await resonantCollinearity(getFixtureStream('2024-08-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
