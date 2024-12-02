import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { redNosedReports } from 'src/2024/02/part2';

describe('AoC 2024 / Day 2: Red-Nosed Reports / Part #2', () => {
  it('should return 4 for the first puzzle input file', async () => {
    const result = await redNosedReports(getFixtureStream('2024-02-test1.txt'));
    const expectedResult = 4;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await redNosedReports(getFixtureStream('2024-02-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
