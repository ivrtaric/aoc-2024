import { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';
import { isSafeReport, parseLine } from './utility';

export async function redNosedReports(puzzleInputFile: ReadStream): Promise<number> {
  let safeCounter = 0;

  await parseFile(puzzleInputFile, line => {
    if (isSafeReport(parseLine(line))) safeCounter++;
  });

  return safeCounter;
}
