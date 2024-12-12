import type { ReadStream } from 'fs';
import { getMiddlePage, isUpdateValid, parseInputFile, sortByRules } from './utility';

export async function printQueue(puzzleInputFile: ReadStream): Promise<number> {
  const { rules, updates } = await parseInputFile(puzzleInputFile);

  const middlePages: Array<number> = [];
  for (const update of updates) {
    if (!isUpdateValid(update, rules)) {
      sortByRules(update, rules);
      middlePages.push(getMiddlePage(update));
    }
  }

  return middlePages.reduce((sum, p) => sum + p, 0);
}
