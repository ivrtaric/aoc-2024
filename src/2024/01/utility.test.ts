import { describe, expect, it } from 'vitest';

import { numberSortComparator, parseLine } from './utility';
import { ParsedLine } from 'src/2024/01/types';

describe('numberSortComparator', () => {
  it('should correctly sort numbers (not as strings by default)', () => {
    const numberArray: Array<number> = [1, 2, 24, 8, 9, 13];

    numberArray.sort();
    expect(numberArray).toEqual([1, 13, 2, 24, 8, 9]);

    numberArray.sort(numberSortComparator);
    expect(numberArray).toEqual([1, 2, 8, 9, 13, 24]);
  });
});

describe('parseLine', () => {
  (
    [
      [{ left: 3, right: 4 }, `3   4`],
      [{ left: 4, right: 3 }, `4   3`],
      [{ left: 2, right: 5 }, `2   5`],
      [{ left: 1, right: 3 }, `1   3`],
      [{ left: 3, right: 9 }, `3   9`],
      [{ left: 3, right: 3 }, `3   3`]
    ] as Array<[ParsedLine, string]>
  ).forEach(([expected, line]) =>
    it(`should return ${JSON.stringify(expected)} for ${line}`, () => expect(parseLine(line)).toEqual(expected))
  );
});
