import type { ReadStream } from 'fs';

import { getMiddlePage, isUpdateValid, parseFile } from './utility';

export async function printQueue(puzzleInputFile: ReadStream): Promise<number> {
  const { rules, updates } = await parseFile(puzzleInputFile);

  const middlePages: Array<number> = [];
  for (const update of updates) {
    if (isUpdateValid(update, rules)) {
      middlePages.push(getMiddlePage(update));
    }
  }

  return middlePages.reduce((sum, p) => sum + p, 0);
}
