import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { plutonianPebbles } from 'src/2024/11/part1';

describe('AoC 2024 / Day 11: Plutonian Pebbles / Part #2', () => {
  it('should return -1 for the second puzzle input file', async () => {
    const result = await plutonianPebbles(getFixtureStream('2024-11-test2.txt'), 75);
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
