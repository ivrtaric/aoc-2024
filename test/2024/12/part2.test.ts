import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { gardenGroups } from 'src/2024/12/part2';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

describe('AoC 2024 / Day 12: Garden Groups / Part #2', () => {
  it('should return 368 for the example map', async () => {
    const result = await gardenGroups(
      Readable.from(
        ['AAAAAA', 'AAABBA', 'AAABBA', 'ABBAAA', 'ABBAAA', 'AAAAAA'].join('\n')
      ) as ReadStream
    );
    const expectedResult = 368;

    expect(result).toEqual(expectedResult);
  });
  it('should return 1206 for the first puzzle input file', async () => {
    const result = await gardenGroups(getFixtureStream('2024-12-test1.txt'));
    const expectedResult = 1206;

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the second puzzle input file', async () => {
    const result = await gardenGroups(getFixtureStream('2024-12-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });
});
