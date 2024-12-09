import type { ReadStream } from 'fs';
import { defragment, FREE_SPACE, parseFile } from './utility';
import { ID } from './types';

export async function diskFragmenter(puzzleInputFile: ReadStream): Promise<number> {
  const diskMap = await parseFile(puzzleInputFile);

  const defragmented = defragment(diskMap).filter(fragment => fragment[ID] !== FREE_SPACE);

  let checksum = 0;
  let currentIndex = 0;
  for (const fragment of defragmented) {
    const [id, size] = fragment;
    for (let it = 0; it < size; it++) {
      checksum += id * currentIndex;
      currentIndex++;
    }
  }
  return checksum;
}
