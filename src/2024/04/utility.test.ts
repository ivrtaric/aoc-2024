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
  it(`should create a diagonal-down array #2`, () => {
    const searchField = ['ABCF', 'ABCF', 'ABCF', 'EBCD', 'EBCD', 'EBCD'];
    expect(diagonalDown(searchField)).toEqual(['F', 'CF', 'BCF', 'ABCD', 'ABCD', 'ABCD', 'EBC', 'EB', 'E']);
  });
});

describe('diagonalUp', () => {
  it('should create a diagonal-up array', () => {
    const searchField = ['AAAEEE', 'BBBBBB', 'CCCCCC', 'FFFDDD'];
    console.log(JSON.stringify(diagonalUp(searchField)));
    expect(diagonalUp(searchField)).toEqual(['A', 'BA', 'CBA', 'FCBE', 'FCBE', 'FCBE', 'DCB', 'DC', 'D']);
  });
  it('should create a diagonal-up array #2', () => {
    const searchField = ['ABCF', 'ABCF', 'ABCF', 'EBCD', 'EBCD', 'EBCD'];
    console.log(JSON.stringify(diagonalUp(searchField)));
    expect(diagonalUp(searchField)).toEqual(['A', 'AB', 'ABC', 'EBCF', 'EBCF', 'EBCF', 'BCD', 'CD', 'D']);
  });
});
