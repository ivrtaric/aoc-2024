const NUM_REGEX = /(\d+)/g;
export const parseLine = (line: string): Array<number> => {
  NUM_REGEX.lastIndex = 0;
  const levels: Array<number> = [];
  for (;;) {
    const result = NUM_REGEX.exec(line);
    if (!result) break;
    levels.push(parseInt(result[0], 10));
  }

  NUM_REGEX.lastIndex = 0;
  return levels;
};

export const isSafeReport = (levels: Array<number>): boolean => {
  let direction: null | 1 | -1 = null;
  for (let i = 0; i < levels.length - 1; i++) {
    if (!isSafeDistance(levels[i], levels[i + 1])) return false;

    const distance = levels[i + 1] - levels[i];
    if (!direction) {
      direction = distance < 0 ? -1 : 1;
    } else {
      if ((direction < 0 && distance > 0) || (direction > 0 && distance < 0)) return false;
    }
  }

  return true;
};

const MIN_SAFE_DISTANCE = 1;
const MAX_SAFE_DISTANCE = 3;
export const isSafeDistance = (first: number, second: number) => {
  const distance = Math.abs(second - first);
  return distance >= MIN_SAFE_DISTANCE && distance <= MAX_SAFE_DISTANCE;
};
