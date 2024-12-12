import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { clawContraption } from 'src/2024/13/part2';

describe('AoC 2024 / Day 13: Claw Contraption / Part #1', () => {
  it('should return 875318608908 for the first puzzle input file', async () => {
    const result = await clawContraption(getFixtureStream('2024-13-test1.txt'));
    const expectedResult = 875318608908;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await clawContraption(getFixtureStream('2024-13-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
