import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { cubeConundrum } from 'src/warm-up/2023-02/part2';
import { CubeCount } from 'src/warm-up/2023-02/types';

describe('AoC 2023 / Day 2: Cube Conundrum', () => {
  const cubeCount: CubeCount = { red: 12, green: 13, blue: 14 };

  it('should return 2286 for the first test game record document', async () => {
    const result = await cubeConundrum(getFixtureStream('warm-up/2023-02-test1.txt'), cubeCount);
    const expectedResult = 2286;

    expect(result).toEqual(expectedResult);
  });
  it('should return 75561 for the second test game record document', async () => {
    const result = await cubeConundrum(getFixtureStream('warm-up/2023-02-test2.txt'), cubeCount);
    const expectedResult = 75561;

    expect(result).toEqual(expectedResult);
  });
});
