import type { ReadStream } from 'fs';
import * as readline from 'readline';
import { DiskMap, ID, SIZE } from './types';

export const FREE_SPACE = -1;

export const parseFile = async (puzzleInputFile: ReadStream): Promise<Array<[number, number]>> => {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  let id = 0;
  let isFile = true;
  const diskMap: Array<[number, number]> = [];
  for await (const line of lineReader) {
    for (let i = 0; i < line.length; i++) {
      const digit = Number(line.charAt(i));
      if (isFile) {
        if (digit > 0) diskMap.push([id, digit]);
        id++;
      } else {
        if (digit > 0) diskMap.push([FREE_SPACE, digit]);
      }

      isFile = !isFile;
    }
  }

  return diskMap;
};

export const defragment = (diskMap: DiskMap): DiskMap => {
  const defragmenting: DiskMap = [...diskMap];

  for (;;) {
    const last = defragmenting.findLast(([id, _]) => id !== FREE_SPACE);
    if (!last) return defragmenting;

    const lastIndex = defragmenting.indexOf(last);

    for (;;) {
      const free = defragmenting.find(([id, _]) => id === FREE_SPACE);
      if (!free) return defragmenting;

      const freeIndex = defragmenting.indexOf(free);
      if (freeIndex > lastIndex) return defragmenting;

      if (last[SIZE] < free[SIZE]) {
        // The fragment fits into the empty space, and there's space to spare
        defragmenting.splice(freeIndex, 0, [...last]);
        free[SIZE] -= last[SIZE];
        last[ID] = FREE_SPACE;
        break;
      } else if (last[SIZE] === free[SIZE]) {
        // The fragment fits exactly into the empty space
        free[ID] = last[ID];
        last[ID] = FREE_SPACE;
        break;
      } else {
        // The fragment is bigger than the empty space
        free[ID] = last[ID];
        last[SIZE] -= free[SIZE];
        // Don't exit the loop - find the next empty space
      }
    }
  }
};
