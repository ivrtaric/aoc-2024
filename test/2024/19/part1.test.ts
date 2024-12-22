import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { linenLayout } from 'src/2024/19/part1';

describe('AoC 2024 / Day 19: Linen Layout / Part #1', () => {
  it('should return 6 for the puzzle input file #1', async () => {
    const result = await linenLayout(getFixtureStream('2024-19-test1.txt'));
    const expectedResult = 6;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the puzzle input file #2', async () => {
    const result = await linenLayout(getFixtureStream('2024-19-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
