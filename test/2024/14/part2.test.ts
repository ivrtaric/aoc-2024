import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { restroomRedoubt } from 'src/2024/14/part2';

describe('AoC 2024 / Day 14: Restroom Redoubt / Part #2', () => {
  it('should return -1 for the second puzzle input file', async () => {
    const result = await restroomRedoubt(getFixtureStream('2024-14-test2.txt'), {
      width: 101,
      height: 103
    });
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
