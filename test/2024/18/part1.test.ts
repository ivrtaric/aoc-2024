import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { ramRun } from 'src/2024/18/part1';

describe('AoC 2024 / Day 18: RAM Run / Part #1', () => {
  it('should return 22 for the puzzle input file #1', async () => {
    const result = await ramRun(getFixtureStream('2024-18-test1.txt'), 6, 12);
    const expectedResult = 22;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the puzzle input file #2', async () => {
    const result = await ramRun(getFixtureStream('2024-18-test2.txt'), 70, 1024);
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
