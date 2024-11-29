import { ReadStream } from 'fs';
import * as readline from 'readline';
import type { CubeCount } from './types';
import { isGamePossible, parseLine } from 'src/warm-up/2023-02/utility';

export async function cubeConundrum(gameRecordFile: ReadStream, cubeCount: CubeCount): Promise<number> {
  const lineReader = readline.createInterface({
    input: gameRecordFile,
    crlfDelay: Infinity
  });

  const gameIds: Array<number> = [];
  for await (const line of lineReader) {
    const gameData = parseLine(line);
    if (isGamePossible(gameData, cubeCount)) {
      gameIds.push(gameData.id);
    }
  }

  return gameIds.reduce((acc, curr) => acc + curr, 0);
}
