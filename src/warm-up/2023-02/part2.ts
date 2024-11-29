import { ReadStream } from 'fs';
import * as readline from 'readline';
import { calculatePower, parseLine } from 'src/warm-up/2023-02/utility';

export async function cubeConundrum(gameRecordFile: ReadStream): Promise<number> {
  const lineReader = readline.createInterface({
    input: gameRecordFile,
    crlfDelay: Infinity
  });

  const gameIds: Array<number> = [];
  for await (const line of lineReader) {
    gameIds.push(calculatePower(parseLine(line)));
  }

  return gameIds.reduce((acc, curr) => acc + curr, 0);
}
