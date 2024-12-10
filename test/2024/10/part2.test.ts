import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { hoofIt } from 'src/2024/10/part2';

describe('AoC 2024 / Day 10: Hoof It / Part #2', () => {
  it('should return 81 for the first puzzle input file', async () => {
    const result = await hoofIt(getFixtureStream('2024-10-test1.txt'));
    const expectedResult = 81;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await hoofIt(getFixtureStream('2024-10-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
