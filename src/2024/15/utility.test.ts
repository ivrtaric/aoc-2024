import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { getBoxGpsCoordinates, parseInputFile, traversePath } from './utility';
import { PuzzleData, Token } from './types';
import { Direction, MappedArea } from '../common/types';

describe('parseInputFile', () => {
  it('should return correct result for the input #1', async () => {
    const fileStream = Readable.from(testInput1) as ReadStream;

    const result = await parseInputFile(fileStream);
    expect(result).toEqual(testPuzzleData1);
  });
  it('should return widened result for the input #3', async () => {
    const fileStream = Readable.from(testInput3) as ReadStream;

    const result = await parseInputFile(fileStream, true);
    expect(result).toEqual(testPuzzleData3);
  });
});

describe('traversePath', () => {
  it('should apply given moves to the mapped area #1', () => {
    const result = traversePath(testPuzzleData1);

    expect(result).toEqual(testResult1);
  });
  it('should apply given moves to the mapped area #2', async () => {
    const fileStream = Readable.from(testInput2) as ReadStream;

    const testPuzzleData2 = await parseInputFile(fileStream);
    const result = traversePath(testPuzzleData2);

    expect(result).toEqual(testResult2);
  });
});

describe('getGpsCoordinates', () => {
  it('should calculate GPS coordinates for the mapped area #1', () => {
    const map = traversePath(testPuzzleData1);
    const gpsCoordinates = getBoxGpsCoordinates(map);
    const result = gpsCoordinates.reduce((sum, gps) => sum + gps, 0);

    expect(result).toEqual(2028);
  });
});

const testInput1 = [
  '########',
  '#..O.O.#',
  '##@.O..#',
  '#...O..#',
  '#.#.O..#',
  '#...O..#',
  '#......#',
  '########',
  '',
  '<^^>>>v',
  'v<v>>v<<'
].join('\n');
const testPuzzleData1: PuzzleData = {
  map: [
    ['#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '.', '.', 'O', '.', 'O', '.', '#'],
    ['#', '#', '@', '.', 'O', '.', '.', '#'],
    ['#', '.', '.', '.', 'O', '.', '.', '#'],
    ['#', '.', '#', '.', 'O', '.', '.', '#'],
    ['#', '.', '.', '.', 'O', '.', '.', '#'],
    ['#', '.', '.', '.', '.', '.', '.', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#']
  ] as MappedArea<Token>,
  startingPosition: [2, 2],
  moves: [
    [0, -1],
    [-1, 0],
    [-1, 0],
    [0, 1],
    [0, 1],
    [0, 1],
    [1, 0],
    [1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [0, 1],
    [1, 0],
    [0, -1],
    [0, -1]
  ] as Array<Direction>
};

const testResult1: MappedArea<Token> = [
  ['#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '.', '.', '.', '.', 'O', 'O', '#'],
  ['#', '#', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '.', '.', 'O', '#'],
  ['#', '.', '#', 'O', '@', '.', '.', '#'],
  ['#', '.', '.', '.', 'O', '.', '.', '#'],
  ['#', '.', '.', '.', 'O', '.', '.', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#']
] as Array<Array<Token>>;

const testInput2 = [
  '##########',
  '#..O..O.O#',
  '#......O.#',
  '#.OO..O.O#',
  '#..O@..O.#',
  '#O#..O...#',
  '#O..O..O.#',
  '#.OO.O.OO#',
  '#....O...#',
  '##########',
  '',
  '<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^',
  'vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v',
  '><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<',
  '<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^',
  '^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><',
  '^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^',
  '>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^',
  '<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>',
  '^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>',
  'v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^'
].join('\n');
const testResult2: MappedArea<Token> = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '.', 'O', '.', 'O', '.', 'O', 'O', 'O', '#'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['#', 'O', 'O', '.', '.', '.', '.', '.', '.', '#'],
  ['#', 'O', 'O', '@', '.', '.', '.', '.', '.', '#'],
  ['#', 'O', '#', '.', '.', '.', '.', '.', 'O', '#'],
  ['#', 'O', '.', '.', '.', '.', '.', 'O', 'O', '#'],
  ['#', 'O', '.', '.', '.', '.', '.', 'O', 'O', '#'],
  ['#', 'O', 'O', '.', '.', '.', '.', 'O', 'O', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
] as Array<Array<Token>>;

const testInput3 = [
  '#######',
  '#...#.#',
  '#.....#',
  '#..OO@#',
  '#..O..#',
  '#.....#',
  '#######',
  '',
  '<vv<<^^<<^^'
].join('\n');
const testPuzzleData3: PuzzleData = {
  map: [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '#', '#'],
    ['#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#'],
    ['#', '#', '.', '.', '.', '.', '[', ']', '[', ']', '@', '.', '#', '#'],
    ['#', '#', '.', '.', '.', '.', '[', ']', '.', '.', '.', '.', '#', '#'],
    ['#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
  ] as MappedArea<Token>,
  startingPosition: [3, 10],
  moves: [
    [0, -1],
    [1, 0],
    [1, 0],
    [0, -1],
    [0, -1],
    [-1, 0],
    [-1, 0],
    [0, -1],
    [0, -1],
    [-1, 0],
    [-1, 0]
  ] as Array<Direction>
};
