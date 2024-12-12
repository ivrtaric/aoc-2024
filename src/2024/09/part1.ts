import type { ReadStream } from 'fs';
import { compact, defragment, FREE_SPACE, parseInputFile } from './utility';

export async function diskFragmenter(puzzleInputFile: ReadStream): Promise<number> {
  const diskMap = await parseInputFile(puzzleInputFile);

  const defragmented = compact(defragment(diskMap));

  let checksum = 0;
  let currentIndex = 0;
  for (const fragment of defragmented) {
    const [id, size] = fragment;
    if (id === FREE_SPACE) {
      currentIndex += size;
    } else {
      for (let it = 0; it < size; it++) {
        checksum += id * currentIndex;
        currentIndex++;
      }
    }
  }
  return checksum;
}
