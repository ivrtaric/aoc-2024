import { ReadStream } from 'fs';

import { loadLines } from '../common/utilities';
import { findStatefulMuls } from './utility';

export async function mullItOver(puzzleInputFile: ReadStream): Promise<number> {
  const lines = await loadLines(puzzleInputFile);

  const multiples: Array<number> = [];
  const lineMultiples = findStatefulMuls(lines.join(''));
  multiples.push(...lineMultiples.map(([a, b]) => a * b));

  return multiples.reduce((sum, m) => sum + m, 0);
}
