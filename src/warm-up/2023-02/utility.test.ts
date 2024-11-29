import { describe, expect, it } from 'vitest';

import { calculatePower, isGamePossible, parseLine } from './utility';
import { CubeCount, GameData } from './types';

describe('parseLine', () => {
  it('should correctly parse a line #1 from source file', () => {
    const line = 'Game 86: 7 blue, 9 green; 7 blue, 1 red, 4 green; 4 green, 13 blue';

    expect(parseLine(line)).toEqual({
      id: 86,
      sets: [
        { green: 9, blue: 7 },
        { red: 1, green: 4, blue: 7 },
        { green: 4, blue: 13 }
      ]
    } as GameData);
  });

  it('should correctly parse a line #2 from source file', () => {
    const line = 'Game 8564546: 1 red; 1 blue; 1 green';

    expect(parseLine(line)).toEqual({
      id: 8564546,
      sets: [{ red: 1 }, { blue: 1 }, { green: 1 }]
    } as GameData);
  });

  it('should throw if an invalid color is encountered', () => {
    const line = 'Game 8564546: 1 red; 1 yellow; 1 black';
    expect(() => parseLine(line)).toThrow(new Error('Invalid color: yellow.'));
  });
});

describe('isGamePossible', () => {
  const testCubeCount: CubeCount = {
    red: 20,
    green: 15,
    blue: 10
  };

  it(`should return false if there's more red cubes required than available`, () =>
    expect(isGamePossible({ id: 1, sets: [{ red: 25, green: 10, blue: 5 }] }, testCubeCount)).toEqual(false));
  it(`should return false if there are only red cubes and more are required than available`, () =>
    expect(isGamePossible({ id: 1, sets: [{ red: 25 }] }, testCubeCount)).toEqual(false));

  it(`should return false if there's more green cubes required than available`, () =>
    expect(isGamePossible({ id: 1, sets: [{ red: 15, green: 20, blue: 5 }] }, testCubeCount)).toEqual(false));
  it(`should return false if there are only green cubes and more are required than available`, () =>
    expect(isGamePossible({ id: 1, sets: [{ green: 25 }] }, testCubeCount)).toEqual(false));

  it(`should return false if there's more blue cubes required than available`, () =>
    expect(isGamePossible({ id: 1, sets: [{ red: 15, green: 10, blue: 15 }] }, testCubeCount)).toEqual(false));
  it(`should return false if there are only red cubes and more are required than available`, () =>
    expect(isGamePossible({ id: 1, sets: [{ blue: 25 }] }, testCubeCount)).toEqual(false));

  it(`should return true if there are less cubes of each color required than available`, () =>
    expect(isGamePossible({ id: 1, sets: [{ red: 15, green: 10, blue: 5 }] }, testCubeCount)).toEqual(true));
});

describe('calculatePower', () => {
  (
    [
      [48, 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'],
      [12, 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'],
      [1560, 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'],
      [630, 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'],
      [36, 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green']
    ] as Array<[number, string]>
  ).forEach(([expected, line]) =>
    it(`should return ${expected} for line "${line}"`, () => {
      expect(calculatePower(parseLine(line))).toEqual(expected);
    })
  );
});
