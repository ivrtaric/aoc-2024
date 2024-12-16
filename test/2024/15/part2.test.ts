import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { warehouseWoes } from 'src/2024/15/part2';

describe('AoC 2024 / Day 15: Restroom Redoubt / Part #2', () => {
  it('should return 9021 for the puzzle input file #1', async () => {
    const result = await warehouseWoes(getFixtureStream('2024-15-test1.txt'));
    const expectedResult = 9021;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the puzzle input file #2', async () => {
    const result = await warehouseWoes(getFixtureStream('2024-15-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
