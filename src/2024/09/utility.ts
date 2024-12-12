import type { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';
import { DiskMap, Fragment, ID, SIZE } from './types';

export const FREE_SPACE = -1;

export const parseInputFile = async (
  puzzleInputFile: ReadStream
): Promise<Array<[number, number]>> => {
  let id = 0;
  let isFile = true;
  const diskMap: Array<[number, number]> = [];

  await parseFile(puzzleInputFile, line => {
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
  });

  return diskMap;
};

export const compact = (diskMap: DiskMap): DiskMap => {
  const compacted: DiskMap = diskMap.map(([id, size]) => [id, size] as Fragment);

  let currentFragment: Fragment | null = null;
  let previousFragment: Fragment | null = null;

  let currentIndex = -1;
  while (true) {
    if (previousFragment && currentFragment && previousFragment[ID] === currentFragment[ID]) {
      previousFragment[SIZE] += currentFragment[SIZE];
      compacted.splice(currentIndex, 1);

      currentFragment = compacted[currentIndex];
    } else {
      currentIndex++;
      previousFragment = currentFragment;
      currentFragment = compacted[currentIndex];
    }

    if (!currentFragment) break;
  }

  return compacted;
};

export const defragment = (diskMap: DiskMap): DiskMap => {
  const defragmenting: DiskMap = diskMap.map(([id, size]) => [id, size] as Fragment);

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

export const defragmentWholeFiles = (diskMap: DiskMap): DiskMap => {
  let defragmenting: DiskMap = diskMap.map(([id, size]) => [id, size] as Fragment);

  let lastIndex: number | undefined = undefined;
  let freeIndex: number | undefined = undefined;
  for (;;) {
    const last = defragmenting.slice(0, lastIndex).findLast(([id, _]) => id !== FREE_SPACE);
    if (!last) return defragmenting;
    lastIndex = defragmenting.indexOf(last);

    for (;;) {
      const free = defragmenting.find(([id, size]) => id === FREE_SPACE && size >= last[SIZE]);
      if (!free) break;
      freeIndex = defragmenting.indexOf(free);

      if (freeIndex > lastIndex) break;
      if (last[SIZE] < free[SIZE]) {
        // The fragment fits into the empty space, and there's space to spare
        defragmenting.splice(freeIndex, 0, [...last]);
        lastIndex++;
        free[SIZE] -= last[SIZE];
        last[ID] = FREE_SPACE;
        defragmenting = compact(defragmenting);
        break;
      } else if (last[SIZE] === free[SIZE]) {
        // The fragment fits exactly into the empty space
        free[ID] = last[ID];
        last[ID] = FREE_SPACE;
        defragmenting = compact(defragmenting);
        break;
      }
    }
  }
};
