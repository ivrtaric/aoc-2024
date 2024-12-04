import { describe, expect, it } from 'vitest';

import { diagonalDown, diagonalUp, pivot } from './utility';

describe('pivot', () => {
  it('should pivot columns into rows', () => {
    const searchField = ['AAAAAA', 'BBBBBB', 'CCCCCC', 'DDDDDD'];
    expect(pivot(searchField)).toEqual(['ABCD', 'ABCD', 'ABCD', 'ABCD', 'ABCD', 'ABCD']);
  });
});

describe('diagonalDown', () => {
  it(`should create a diagonal-down array`, () => {
    const searchField = ['AAAEEE', 'BBBBBB', 'CCCCCC', 'FFFDDD'];
    expect(diagonalDown(searchField)).toEqual(['E', 'EB', 'EBC', 'ABCD', 'ABCD', 'ABCD', 'BCF', 'CF', 'F']);
  });
});

describe('diagonalUp', () => {
  it('should create a diagonal-up array', () => {
    const searchField = ['AAAEEE', 'BBBBBB', 'CCCCCC', 'FFFDDD'];
    console.log(JSON.stringify(diagonalUp(searchField)));
    expect(diagonalUp(searchField)).toEqual(['A', 'BA', 'CBA', 'FCBE', 'FCBE', 'FCBE', 'DCB', 'DC', 'D']);
  });
});
