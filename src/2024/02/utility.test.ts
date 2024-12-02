import { describe, expect, it } from 'vitest';

import { isSafeDistance, isSafeReport, parseLine } from './utility';

describe('parseLine', () => {
  (
    [
      [[7, 6, 4, 2, 1], `7 6 4 2 1`],
      [[1, 2, 7, 8, 9], `1 2 7 8 9`],
      [[9, 7, 6, 2, 1], `9 7 6 2 1`],
      [[1, 3, 2, 4, 5], `1 3 2 4 5`],
      [[8, 6, 4, 4, 1], `8 6 4 4 1`],
      [[1, 3, 6, 7, 9], `1 3 6 7 9`]
    ] as Array<[Array<number>, string]>
  ).forEach(([expected, line]) =>
    it(`should return ${JSON.stringify(expected)} for ${line}`, () => expect(parseLine(line)).toEqual(expected))
  );
});

describe('isSafeReport', () => {
  (
    [
      [true, [7, 6, 4, 2, 1]],
      [false, [1, 2, 7, 8, 9]],
      [false, [9, 7, 6, 2, 1]],
      [false, [1, 3, 2, 4, 5]],
      [false, [8, 6, 4, 4, 1]],
      [true, [1, 3, 6, 7, 9]]
    ] as Array<[boolean, Array<number>]>
  ).forEach(([expected, report]) =>
    it(`should return ${JSON.stringify(expected)} for ${report}`, () => expect(isSafeReport(report)).toEqual(expected))
  );
});

describe('isSafeDistance', () => {
  (
    [
      [true, 1, 2],
      [true, 2, 1],
      [true, 2, 4],
      [true, 4, 2],
      [true, 54, 57],
      [true, 63, 60],
      [false, 1233, 1233],
      [false, 101, 90],
      [false, 90, 94]
    ] as Array<[boolean, number, number]>
  ).forEach(([expected, first, second]) =>
    it(`should return ${JSON.stringify(expected)} for first=${first} and second=${second}`, () =>
      expect(isSafeDistance(first, second)).toEqual(expected))
  );
});
