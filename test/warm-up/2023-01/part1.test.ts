import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { trebuchet } from 'src/warm-up/2023-01/part1';

describe('AoC 2023 / Day 1: Trebuchet?!', () => {
  it('should return 142 for the first test calibration document', async () => {
    const result = await trebuchet(getFixtureStream('warm-up/2023-01-test1.txt'));
    const expectedResult = 142;

    expect(result).toEqual(expectedResult);
  });
  it('should return 54630 for the second test calibration document', async () => {
    const result = await trebuchet(getFixtureStream('warm-up/2023-01-test2.txt'));
    const expectedResult = 54630;

    expect(result).toEqual(expectedResult);
  });
});
