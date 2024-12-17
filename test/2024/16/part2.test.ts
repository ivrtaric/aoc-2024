import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { reindeerMaze } from 'src/2024/16/part2';

describe('AoC 2024 / Day 16: Reindeer Maze / Part #2', () => {
  it('should return 45 for the puzzle input file #1', async () => {
    const result = await reindeerMaze(getFixtureStream('2024-16-test1.txt'));
    const expectedResult = 45;

    expect(result).toEqual(expectedResult);
  });
  it('should return 64 for the puzzle input file #2', async () => {
    const result = await reindeerMaze(getFixtureStream('2024-16-test2.txt'));
    const expectedResult = 64;

    expect(result).toEqual(expectedResult);
  });
  it.skip('should return -1 for the puzzle input file #3', async () => {
    const result = await reindeerMaze(getFixtureStream('2024-16-test3.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
