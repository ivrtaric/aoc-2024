import { ReadStream } from 'fs';
import * as readline from 'readline';

export type CubeCount = {
  red: number;
  green: number;
  blue: number;
};
export type GameData = {
  id: number;
  sets: Array<Partial<CubeCount>>;
};

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

  console.log(gameIds);
  return gameIds.reduce((acc, curr) => acc + curr, 0);
}

const parseLine = (line: string): GameData => {
  const [strGameId, strSets] = line.split(':');
  const [, strId] = strGameId.split(' ');
  const gameData: GameData = { id: parseInt(strId, 10), sets: [] };

  const sets = strSets.split(';');
  for (const strSet of sets) {
    const setStrings = strSet.split(',').map(s => s.trim());
    const counts: Partial<CubeCount> = {};
    for (const pull of setStrings) {
      const [strAmount, color] = pull.split(' ');
      const amount = parseInt(strAmount, 10);
      switch (color) {
        case 'red':
          counts.red = amount;
          break;
        case 'green':
          counts.green = amount;
          break;
        case 'blue':
          counts.blue = amount;
          break;
        default:
          throw new Error(`Invalid color: ${color}.`);
      }
    }
    gameData.sets.push(counts);
  }

  return gameData;
};

const isGamePossible = (gameData: GameData, cubeCount: CubeCount) => {
  for (const pull of gameData.sets) {
    if ((pull.red ?? 0) > cubeCount.red || (pull.green ?? 0) > cubeCount.green || (pull.blue ?? 0) > cubeCount.blue) {
      return false;
    }
  }

  return true;
};
