import { describe, expect, it } from 'vitest';
import { chronospatialComputer } from 'src/2024/17/part2';
import { getFixtureStream } from 'test/utilities';

describe('AoC 2024 / Day 17: Chronospatial Computer / Part #2', () => {
  it('should return -1 for the puzzle input file #2', async () => {
    const result = await chronospatialComputer(getFixtureStream('2024-17-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
