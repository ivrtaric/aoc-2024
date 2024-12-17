import type { ReadStream } from 'fs';

import { Direction, Location, MappedArea } from '../common/types';
import { parseFile } from '../common/utilities';
import { type BoxPosition, DirectionToken, DoubleToken, type PuzzleData, Token } from './types';

const MODIFIERS: Record<DirectionToken, Direction> = {
  [DirectionToken.UP]: [-1, 0],
  [DirectionToken.DOWN]: [1, 0],
  [DirectionToken.LEFT]: [0, -1],
  [DirectionToken.RIGHT]: [0, 1]
};

export const parseInputFile = async (
  puzzleInputFile: ReadStream,
  widen = false
): Promise<PuzzleData> => {
  const map: PuzzleData['map'] = [];
  const moves: PuzzleData['moves'] = [];

  let stage = 'map';
  let startingPosition: Location = [0, 0];
  let index = 0;
  await parseFile(puzzleInputFile, line => {
    if (line === '') {
      stage = 'moves';
      return;
    }

    switch (stage) {
      case 'map':
        let tokenLine = line.split('') as Array<Token>;
        if (widen) {
          tokenLine = tokenLine.flatMap(t => {
            switch (t) {
              case Token.WALL:
                return DoubleToken.WALL;
              case Token.BOX:
                return DoubleToken.BOX;
              case Token.BLANK:
                return DoubleToken.BLANK;
              case Token.ROBOT:
                return [Token.ROBOT, Token.BLANK];
              default:
                throw new Error(`Invalid token: ${t}`);
            }
          });
        }
        map.push(tokenLine);
        if (line.includes(Token.ROBOT)) {
          startingPosition = [index, tokenLine.indexOf(Token.ROBOT)];
        }
        break;
      case 'moves':
        moves.push(...(line.split('') as Array<DirectionToken>).map(d => MODIFIERS[d]));
        break;
      default:
        throw new Error(`Invalid stage: ${stage}`);
    }
    index++;
  });

  return { map, startingPosition, moves };
};

export const traversePath = ({ map, moves, startingPosition }: PuzzleData): MappedArea<Token> => {
  const mapCopy = map.map(line => [...line]);
  let robotPosition = startingPosition;
  for (const move of moves) {
    switch (observe(robotPosition, move, mapCopy)) {
      case Token.WALL:
        break;
      case Token.BLANK:
        robotPosition = moveRobot(robotPosition, move, mapCopy);
        break;
      case Token.BOX: {
        const blankPosition = blankLookAhead(robotPosition, move, mapCopy);
        if (blankPosition) {
          mapCopy[blankPosition[0]][blankPosition[1]] = Token.BOX;
          robotPosition = moveRobot(robotPosition, move, mapCopy);
        }
        break;
      }
      case Token.BOX_LEFT:
      case Token.BOX_RIGHT: {
        const boxPosition = getBoxPositionInDirection(robotPosition, move, mapCopy);
        if (!boxPosition) throw new Error('Invalid box position');
        if (moveWideBox(boxPosition, move, mapCopy)) {
          robotPosition = moveRobot(robotPosition, move, mapCopy);
        }
        break;
      }
      default:
        throw new Error('Invalid token encountered');
    }
  }

  return mapCopy;
};

const getBoxPositionInDirection = (
  [x, y]: Location,
  [dx, dy]: Direction,
  map: MappedArea<Token>
): BoxPosition | null => {
  const [bx, by]: Location = [x + dx, y + dy];
  return map[bx][by] === Token.BOX_LEFT || map[bx][by] === Token.BOX_RIGHT
    ? {
        left: map[bx][by] === Token.BOX_LEFT ? [bx, by] : [bx, by - 1],
        right: map[bx][by] === Token.BOX_RIGHT ? [bx, by] : [bx, by + 1]
      }
    : null;
};

export const moveWideBox = (
  boxPosition: BoxPosition,
  [dx, dy]: Direction,
  map: MappedArea<Token>
): Location | null => {
  if (dx !== 0) return moveWideBoxVertical([boxPosition], [dx, dy], map);
  if (dy === 1) return moveWideBoxRight(boxPosition, map);
  if (dy === -1) return moveWideBoxLeft(boxPosition, map);

  return null;
};

const moveWideBoxVertical = (
  boxes: Array<BoxPosition>,
  move: Direction,
  map: MappedArea<Token>
): Location | null => {
  if (hasWall(boxes, move, map)) return null;

  const nextBoxes = boxes.flatMap(box => getBoxes(box, move, map));
  if (nextBoxes.length) {
    const moved = moveWideBoxVertical(nextBoxes, move, map);
    if (!moved) return null;
  }

  if (!canMove(boxes, move, map)) return null;
  const [dx] = move;
  for (const box of boxes) {
    const [[bx, bly], [_, bry]] = [box.left, box.right];
    map[bx + dx][bly] = Token.BOX_LEFT;
    map[bx + dx][bry] = Token.BOX_RIGHT;
    map[bx][bly] = map[bx][bry] = Token.BLANK;
  }
  return boxes[0].left;
};

const hasWall = (boxes: Array<BoxPosition>, move: Direction, map: MappedArea<Token>): boolean =>
  boxes.reduce(
    (isWall, box) =>
      isWall ||
      observe(box.left, move, map) === Token.WALL ||
      observe(box.right, move, map) === Token.WALL,
    false
  );
const getBoxes = (box: BoxPosition, move: Direction, map: MappedArea<Token>): Array<BoxPosition> =>
  [
    getBoxPositionInDirection(box.left, move, map),
    getBoxPositionInDirection(box.right, move, map)
  ].filter(x => x !== null);
const canMove = (boxes: Array<BoxPosition>, move: Direction, map: MappedArea<Token>): boolean =>
  boxes.reduce(
    (_canMove, box) =>
      _canMove &&
      observe(box.left, move, map) === Token.BLANK &&
      observe(box.right, move, map) === Token.BLANK,
    true
  );

const moveWideBoxLeft = (box: BoxPosition, map: MappedArea<Token>): Location | null => {
  const move: Direction = [0, -1];
  switch (observe(box.left, move, map)) {
    case Token.WALL:
      return null;
    case Token.BOX_RIGHT: {
      const nextBox = getBoxPositionInDirection(box.left, move, map);
      if (!nextBox) return null;
      if (!moveWideBoxLeft(nextBox, map)) return null; // else fall-through
    }
    case Token.BLANK: {
      const [[bx, bly], [_, bry]] = [box.left, box.right];
      map[bx][bly - 1] = Token.BOX_LEFT;
      map[bx][bry - 1] = Token.BOX_RIGHT;
      map[bx][bry] = Token.BLANK;
      return [bx, bry];
    }
    default:
      throw new Error(`Invalid token encountered`);
  }
};
const moveWideBoxRight = (box: BoxPosition, map: MappedArea<Token>): Location | null => {
  const move: Direction = [0, 1];
  switch (observe(box.right, move, map)) {
    case Token.WALL:
      return null;
    case Token.BOX_LEFT: {
      const nextBox = getBoxPositionInDirection(box.right, move, map);
      if (!nextBox) return null;
      if (!moveWideBoxRight(nextBox, map)) return null; // else fall-through
    }
    case Token.BLANK: {
      const [[bx, bly], [_, bry]] = [box.left, box.right];
      map[bx][bry + 1] = Token.BOX_RIGHT;
      map[bx][bly + 1] = Token.BOX_LEFT;
      map[bx][bly] = Token.BLANK;
      return [bx, bly];
    }
    default:
      throw new Error(`Invalid token encountered`);
  }
};

export const observe = ([x, y]: Location, [dx, dy]: Direction, map: MappedArea<Token>): Token =>
  map[x + dx][y + dy];

export const moveRobot = (
  [x, y]: Location,
  [dx, dy]: Direction,
  map: MappedArea<Token>
): Location => {
  map[x][y] = Token.BLANK;
  const end: Location = [x + dx, y + dy];
  map[end[0]][end[1]] = Token.ROBOT;
  return end;
};

export const blankLookAhead = (
  [x, y]: Location,
  [dx, dy]: Direction,
  map: MappedArea<Token>
): Location | null => {
  let [ox, oy] = [x + dx, y + dy];
  while (map[ox][oy] === Token.BOX) {
    [ox, oy] = [ox + dx, oy + dy];
  }

  return map[ox][oy] === Token.BLANK ? [ox, oy] : null;
};

export const gpsCoordinate = ([x, y]: Location): number => 100 * x + y;
export const getBoxGpsCoordinates = (map: MappedArea<Token>): Array<number> =>
  map.flatMap((line, x) =>
    line
      .map((t: Token, y: number) =>
        t === Token.BOX || t === Token.BOX_LEFT ? gpsCoordinate([x, y]) : null
      )
      .filter(x => x !== null)
  );
