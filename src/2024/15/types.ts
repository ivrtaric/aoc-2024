import type { Direction, Location, MappedArea } from '../common/types';

export const enum Token {
  WALL = '#',
  BOX = 'O',
  BOX_LEFT = '[',
  BOX_RIGHT = ']',
  BLANK = '.',
  ROBOT = '@'
}
export const DoubleToken = {
  WALL: [Token.WALL, Token.WALL],
  BLANK: [Token.BLANK, Token.BLANK],
  BOX: [Token.BOX_LEFT, Token.BOX_RIGHT],
  ROBOT: [Token.ROBOT, Token.BLANK]
};
export type BoxPosition = { left: Location; right: Location };

export const enum DirectionToken {
  UP = '^',
  DOWN = 'v',
  LEFT = '<',
  RIGHT = '>'
}

export type PuzzleData = {
  map: MappedArea<Token>;
  startingPosition: Location;
  moves: Array<Direction>;
};
