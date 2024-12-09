import { ReadStream } from 'fs';
import { compact, defragmentWholeFiles, FREE_SPACE, parseFile } from 'src/2024/09/utility';

export async function diskFragmenter(puzzleInputFile: ReadStream): Promise<number> {
  const diskMap = await parseFile(puzzleInputFile);

  const defragmented = compact(defragmentWholeFiles(diskMap));

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
