import type { ReadStream } from 'fs';
import { findShortestPathTiles, parseInputFile } from './utility';

export async function reindeerMaze(puzzleInputFile: ReadStream): Promise<number> {
  const { start, end, graph } = await parseInputFile(puzzleInputFile);

  console.log({ start, end });
  const result = findShortestPathTiles(start, end, graph);

  return result;
}
