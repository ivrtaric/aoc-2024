import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { restroomRedoubt } from 'src/2024/14/part1';

describe('AoC 2024 / Day 14: Restroom Redoubt / Part #1', () => {
  it('should return 12 for the first puzzle input file', async () => {
    const result = await restroomRedoubt(
      getFixtureStream('2024-14-test1.txt'),
      { width: 11, height: 7 },
      100
    );
    const expectedResult = 12;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await restroomRedoubt(
      getFixtureStream('2024-14-test2.txt'),
      { width: 101, height: 103 },
      100
    );
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
