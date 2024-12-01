import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { historianHysteria } from 'src/2024/01/part1';

describe('AoC 2024 / Day 1: Historian Hysteria', () => {
  it('should return 11 for the first puzzle input file', async () => {
    const result = await historianHysteria(getFixtureStream('2024-01-test1.txt'));
    const expectedResult = 11;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await historianHysteria(getFixtureStream('2024-01-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
