import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { bridgeRepair } from 'src/2024/07/part1';

describe('AoC 2024 / Day 7: Bridge Repair / Part #1', () => {
  it('should return 3749 for the first puzzle input file', async () => {
    const result = await bridgeRepair(getFixtureStream('2024-07-test1.txt'));
    const expectedResult = 3749;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await bridgeRepair(getFixtureStream('2024-07-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
