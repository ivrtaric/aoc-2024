import { ReadStream } from 'fs';
import * as readline from 'readline';

import { isSafeReport, parseLine } from 'src/2024/02/utility';

export async function redNosedReports(puzzleInputFile: ReadStream): Promise<number> {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  let safeCounter = 0;
  for await (const line of lineReader) {
    const levels = parseLine(line);
    if (isSafeReport(levels)) {
      safeCounter++;
      continue;
    }

    for (let i = 0; i < levels.length; i++) {
      const dampenedLevels = [...levels];
      dampenedLevels.splice(i, 1);
      if (isSafeReport(dampenedLevels)) {
        safeCounter++;
        break;
      }
    }
  }

  return safeCounter;
}
