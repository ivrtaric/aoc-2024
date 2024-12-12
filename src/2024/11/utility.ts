import type { ReadStream } from 'fs';
import { parseFile } from '../common/utilities';

export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<Array<number>> =>
  (
    await parseFile<Array<number>>(puzzleInputFile, line =>
      line.split(' ').filter(Boolean).map(Number)
    )
  ).flat();

const countsByStoneAndBlinks = new Map<string, number>();
export const blinkCount = (stone: number, blinks: number): number => {
  if (blinks === 0) return 0;
  const mapKey = `${stone}/${blinks}`;
  if (countsByStoneAndBlinks.has(mapKey)) {
    return countsByStoneAndBlinks.get(mapKey) as number;
  }

  const blinked = blinkStone(stone);
  let count: number;
  if (blinks === 1) {
    count = Array.isArray(blinked) ? 2 : 1;
  } else if (Array.isArray(blinked)) {
    count = blinkCount(blinked[0], blinks - 1) + blinkCount(blinked[1], blinks - 1);
  } else {
    count = blinkCount(blinked, blinks - 1);
  }

  countsByStoneAndBlinks.set(mapKey, count);
  return count;
};

const blinksMap = new Map<number, number | Array<number>>([
  [0, 1],
  [1, 2024],
  [2, 4048],
  [4, 8096],
  [6, 12144],
  [8, 16192],
  [9, 18216],
  [20, [2, 0]],
  [24, [2, 4]],
  [40, [4, 0]],
  [48, [4, 8]],
  [80, [8, 0]],
  [96, [9, 6]],
  [2024, [20, 24]],
  [4048, [40, 48]],
  [8096, [80, 96]]
]);
export const blinkStone = (stone: number): number | Array<number> =>
  blinksMap.get(stone) ?? _blinkStone(stone);
const _blinkStone = (stone: number): number | Array<number> => {
  const strNumber = String(stone);
  if (strNumber.length % 2 === 0) {
    const result = [
      Number(strNumber.substring(0, strNumber.length / 2)),
      Number(strNumber.substring(strNumber.length / 2))
    ] as Array<number>;
    blinksMap.set(stone, result);
    return result;
  }

  blinksMap.set(stone, stone * 2024);
  return blinksMap.get(stone) as number | Array<number>;
};
