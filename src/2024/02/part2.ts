import { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';
import { isSafeReport, parseLine } from './utility';

export async function redNosedReports(puzzleInputFile: ReadStream): Promise<number> {
  let safeCounter = 0;

  await parseFile(puzzleInputFile, line => {
    const levels = parseLine(line);

    if (isSafeReport(levels)) {
      safeCounter++;
      return;
    }

    for (let i = 0; i < levels.length; i++) {
      const dampenedLevels = [...levels];
      dampenedLevels.splice(i, 1);
      if (isSafeReport(dampenedLevels)) {
        safeCounter++;
        break;
      }
    }
  });

  return safeCounter;
}
