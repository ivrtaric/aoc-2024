import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { chronospatialComputer } from 'src/2024/17/part1';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

describe('AoC 2024 / Day 17: Chronospatial Computer / Part #1', () => {
  it('should return "4,6,3,5,6,3,5,2,1,0" for the puzzle input file #1', async () => {
    const result = await chronospatialComputer(getFixtureStream('2024-17-test1.txt'));
    const expectedResult = '4,6,3,5,6,3,5,2,1,0';

    expect(result).toEqual(expectedResult);
  });
  it('should return -1 for the puzzle input file #2', async () => {
    const result = await chronospatialComputer(getFixtureStream('2024-17-test2.txt'));
    const expectedResult = -1;

    expect(result).toEqual(expectedResult);
  });

  it('should return 0,3,5,4,3,0 for the custom puzzle input', async () => {
    const program = '0,3,5,4,3,0';
    const result = await chronospatialComputer(
      Readable.from(
        ['Register A: 117440', 'Register B: 0', 'Register C: 0', '', `Program: ${program}`].join(
          '\n'
        )
      ) as ReadStream
    );

    expect(result).toEqual(program);
  });
});
