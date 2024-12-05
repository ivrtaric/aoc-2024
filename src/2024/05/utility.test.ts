import { describe, expect, it } from 'vitest';

import { arePagesPresent, getMiddlePage, isRuleObserved, isUpdateValid } from './utility';
import type { Rule, Update } from './types';

describe('arePagesPresent', () => {
  (
    [
      [true, [75, 47, 61, 53, 29], [47, 53]],
      [false, [75, 47, 61, 53, 29], [97, 13]],
      [false, [75, 47, 61, 53, 29], [47, 13]]
    ] as Array<[boolean, Update, Rule]>
  ).forEach(([expected, update, rule]) =>
    it(`should return ${expected} for Update ${JSON.stringify(update)} and Rule ${JSON.stringify(rule)}`, () => {
      expect(arePagesPresent(update, rule[0], rule[1])).toEqual(expected);
    })
  );
});

describe('isRuleObserved', () => {
  (
    [
      [true, [75, 47, 61, 53, 29], [47, 53]],
      [true, [75, 47, 61, 53, 29], [75, 29]],
      [false, [75, 47, 61, 53, 29], [47, 75]]
    ] as Array<[boolean, Update, Rule]>
  ).forEach(([expected, update, rule]) =>
    it(`should return ${expected} for Update ${JSON.stringify(update)} and Rule ${JSON.stringify(rule)}`, () => {
      expect(isRuleObserved(update, rule)).toEqual(expected);
    })
  );
});

describe('getMiddlePage', () => {
  (
    [
      [61, [75, 47, 61, 53, 29]],
      [52, [11, 76, 73, 69, 62, 16, 87, 59, 38, 23, 52, 22, 55, 79, 21, 42, 34, 89, 85, 37, 26]]
    ] as Array<[number, Array<number>]>
  ).forEach(([expected, tested]) =>
    it(`should return ${expected} for ${JSON.stringify(tested)}`, () => {
      expect(getMiddlePage(tested)).toEqual(expected);
    })
  );
});

describe('isUpdateValid', () => {
  const rules: Array<Rule> = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13]
  ];

  (
    [
      [true, [75, 47, 61, 53, 29], rules],
      [true, [97, 61, 53, 29, 13], rules],
      [true, [75, 29, 13], rules],
      [false, [75, 97, 47, 61, 53], rules],
      [false, [61, 13, 29], rules],
      [false, [97, 13, 75, 29, 47], rules]
    ] as Array<[boolean, Update, Array<Rule>]>
  ).forEach(([expected, update, rule]) =>
    it(`should return ${expected} for Update ${JSON.stringify(update)} and Rules ${JSON.stringify(rules)}`, () => {
      expect(isUpdateValid(update, rules)).toEqual(expected);
    })
  );
});
