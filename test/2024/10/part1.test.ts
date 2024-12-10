import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { hoofIt } from 'src/2024/10/part1';

describe('AoC 2024 / Day 10: Hoof It / Part #1', () => {
  it('should return 36 for the first puzzle input file', async () => {
    const result = await hoofIt(getFixtureStream('2024-10-test1.txt'));
    const expectedResult = 36;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await hoofIt(getFixtureStream('2024-10-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
