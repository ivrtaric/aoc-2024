import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { warehouseWoes } from 'src/2024/15/part1';

describe('AoC 2024 / Day 15: Warehouse Woes / Part #1', () => {
  it('should return 10092 for the puzzle input file #1', async () => {
    const result = await warehouseWoes(getFixtureStream('2024-15-test1.txt'));
    const expectedResult = 10092;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the puzzle input file #2', async () => {
    const result = await warehouseWoes(getFixtureStream('2024-15-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
