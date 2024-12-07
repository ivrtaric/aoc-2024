import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { bridgeRepair } from 'src/2024/07/part2';

describe('AoC 2024 / Day 7: Guard Gallivant / Part #2', () => {
  it('should return 11387 for the first puzzle input file', async () => {
    const result = await bridgeRepair(getFixtureStream('2024-07-test1.txt'));
    const expectedResult = 11387;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await bridgeRepair(getFixtureStream('2024-07-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
