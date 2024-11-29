import type { CubeCount, GameData } from './types';

export const parseLine = (line: string): GameData => {
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

export const isGamePossible = (gameData: GameData, cubeCount: CubeCount) => {
  for (const pull of gameData.sets) {
    if ((pull.red ?? 0) > cubeCount.red || (pull.green ?? 0) > cubeCount.green || (pull.blue ?? 0) > cubeCount.blue) {
      return false;
    }
  }

  return true;
};

export const calculatePower = (gameData: GameData): number => {
  const maxCubeCount: CubeCount = { red: 0, green: 0, blue: 0 };

  for (const set of gameData.sets) {
    if ((set.red ?? 0) > maxCubeCount.red) maxCubeCount.red = set.red as number;
    if ((set.green ?? 0) > maxCubeCount.green) maxCubeCount.green = set.green as number;
    if ((set.blue ?? 0) > maxCubeCount.blue) maxCubeCount.blue = set.blue as number;
  }

  return maxCubeCount.red * maxCubeCount.green * maxCubeCount.blue;
};
