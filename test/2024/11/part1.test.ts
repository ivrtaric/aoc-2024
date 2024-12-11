import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { plutonianPebbles } from 'src/2024/11/part1';

describe('AoC 2024 / Day 11: Plutonian Pebbles / Part #1', () => {
  it('should return 7 for the puzzle input and 1 iterations', async () => {
    const result = await plutonianPebbles(getFixtureStream('2024-11-test1.txt'), 1);
    const expectedResult = 7;

    expect(result).toEqual(expectedResult);
  });
  it('should return 22 for the puzzle input file and 6 iterations', async () => {
    const result = await plutonianPebbles(getFixtureStream('2024-11-test1a.txt'), 6);
    const expectedResult = 22;

    expect(result).toEqual(expectedResult);
  });
  it('should return 55312 for the first puzzle input file and 25 iterations', async () => {
    const result = await plutonianPebbles(getFixtureStream('2024-11-test1a.txt'), 25);
    const expectedResult = 55312;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await plutonianPebbles(getFixtureStream('2024-11-test2.txt'), 25);
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
