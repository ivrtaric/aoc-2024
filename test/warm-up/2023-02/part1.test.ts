import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { cubeConundrum, CubeCount } from 'src/warm-up/2023-02/part1';

describe('AoC 2023 / Day 2: Cube Conundrum', () => {
  const cubeCount: CubeCount = { red: 12, green: 13, blue: 14 };

  it('should return 8 for the first test game record document', async () => {
    const result = await cubeConundrum(getFixtureStream('warm-up/2023-02-test1.txt'), cubeCount);
    const expectedResult = 8;

    expect(result).toEqual(expectedResult);
  });
  it('should return 2795 for the second test game record document', async () => {
    const result = await cubeConundrum(getFixtureStream('warm-up/2023-02-test2.txt'), cubeCount);
    const expectedResult = 2795;

    expect(result).toEqual(expectedResult);
  });
});
