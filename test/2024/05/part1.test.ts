import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';

import { printQueue } from 'src/2024/05/part1';

describe('AoC 2024 / Day 5: Print Queue / Part #1', () => {
  it('should return 143 for the first puzzle input file', async () => {
    const result = await printQueue(getFixtureStream('2024-05-test1.txt'));
    const expectedResult = 143;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await printQueue(getFixtureStream('2024-05-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
