import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { raceCondition } from 'src/2024/20/part2';

describe('AoC 2024 / Day 20: Race Condition / Part #2', () => {
  it('should return 0 for the puzzle input file #1', async () => {
    const result = await raceCondition(getFixtureStream('2024-20-test1.txt'));
    const expectedResult = 0;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the puzzle input file #2', async () => {
    const result = await raceCondition(getFixtureStream('2024-20-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
