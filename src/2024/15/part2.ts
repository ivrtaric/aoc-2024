import type { ReadStream } from 'fs';
import { getBoxGpsCoordinates, parseInputFile, traversePath } from './utility';

export async function warehouseWoes(puzzleInputFile: ReadStream): Promise<number> {
  const puzzleData = await parseInputFile(puzzleInputFile, true);
  const map = traversePath(puzzleData);
  const gpsCoordinates = getBoxGpsCoordinates(map);

  return gpsCoordinates.reduce((sum, gps) => sum + gps, 0);
}
