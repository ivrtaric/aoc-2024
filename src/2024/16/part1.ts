import type { ReadStream } from 'fs';
import { keyOf } from '../common/utilities';
import { findShortestPath, parseInputFile } from './utility';

export async function reindeerMaze(puzzleInputFile: ReadStream): Promise<number> {
  const { start, end, graph } = await parseInputFile(puzzleInputFile);

  console.log(`Nodes: ${graph.nodes.size} / Edges: ${graph.edges.length}`);
  const { distances } = findShortestPath(start, end, graph);

  return distances.get(keyOf(end)) ?? Infinity;
}
