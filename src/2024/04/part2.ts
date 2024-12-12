import { ReadStream } from 'fs';

import { loadLines } from '../common/utilities';
import { findXMas } from './utility';

export async function ceresSearch(puzzleInputFile: ReadStream): Promise<number> {
  const searchField = await loadLines(puzzleInputFile);

  return findXMas(searchField);
}
