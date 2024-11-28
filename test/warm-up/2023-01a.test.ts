import { describe, expect, it } from 'vitest';
import { getFixtureStream } from 'test/utilities';
import { trebuchet } from 'src/warm-up/2023-01a';

describe('AoC 2023 / Day 1: Trebuchet?! / Part #2', () => {
  it('should return 281 for the first test calibration document', async () => {
    const result = await trebuchet(getFixtureStream('warm-up/2023-01a-test1.txt'));
    const expectedResult = 281;

    expect(result).toEqual(expectedResult);
  });
  it('should return 54770 for the second test calibration document', async () => {
    const result = await trebuchet(getFixtureStream('warm-up/2023-01-test2.txt'));
    const expectedResult = 54770;

    expect(result).toEqual(expectedResult);
  });
});
