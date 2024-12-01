import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { historianHysteria } from 'src/2024/01/part2';

describe('AoC 2024 / Day 1: Historian Hysteria / Part #2', () => {
  it('should return 31 for the first puzzle input file', async () => {
    const result = await historianHysteria(getFixtureStream('2024-01-test1.txt'));
    const expectedResult = 31;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await historianHysteria(getFixtureStream('2024-01-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
