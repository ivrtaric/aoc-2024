import { ReadStream } from 'fs';

import { Direction, Directions, Location } from '../common/types';
import { keyOf, parseFile } from '../common/utilities';

import { Edge, Graph, PreviousData, PuzzleData, Scores, Tiles } from './types';
import * as console from 'node:console';

export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<PuzzleData> => {
  let start: Location = [0, 0];
  let end: Location = [0, 0];
  const nodes: Map<string, Location> = new Map();
  const edges: Array<[Location, Location, number]> = [];

  const map: PuzzleData['map'] = await parseFile<Array<Tiles>>(puzzleInputFile, (line, x) => {
    if (line.includes(Tiles.START)) {
      start = [x, line.indexOf(Tiles.START)];
    }
    if (line.includes(Tiles.END)) {
      end = [x, line.indexOf(Tiles.END)];
    }

    const lineItems = line.split('') as Array<Tiles>;
    lineItems.forEach((tile, y) => {
      if (tile === Tiles.WALL) return;

      const location: Location = [x, y];
      nodes.set(keyOf(location), location);

      const leftNeighbor = nodes.values().find(([px, py]) => px === x && py === y - 1);
      if (leftNeighbor) {
        edges.push([leftNeighbor, location, 1]);
      }

      const topNeighbor = nodes.values().find(([px, py]) => px === x - 1 && py === y);
      if (topNeighbor) {
        edges.push([topNeighbor, location, 1]);
      }
    });

    return lineItems;
  });

  return { map, start, end, graph: mergeEdges({ nodes, edges }) };
};
const mergeEdges = (graph: Graph<Location>): Graph<Location> => {
  for (const [key, node] of graph.nodes) {
    const edges = findEdgesFrom(node, graph);
    if (edges.length !== 2) continue;

    const edgeNodes = edges.map(e => findOtherNode(node, e));
    if (
      (edgeNodes[0][0] === node[0] && edgeNodes[1][0] === node[0]) ||
      (edgeNodes[0][1] === node[1] && edgeNodes[1][1] === node[1])
    ) {
      const totalWeight = edges.reduce((sum, [, , weight]) => sum + weight, 0);
      // @ts-ignore
      graph.edges[graph.edges.indexOf(edges[1])] = undefined;
      edges[0][0] = edgeNodes[0];
      edges[0][1] = edgeNodes[1];
      edges[0][2] = totalWeight;
      graph.nodes.delete(key);
    }
  }
  graph.edges = graph.edges.filter(x => x !== undefined);
  return graph;
};

const START_DIRECTION = Directions.RIGHT;
export const findShortestPath = (
  start: Location,
  end: Location,
  graph: Graph<Location>,
  startDirection: Direction = START_DIRECTION
) => {
  const unvisited = new Set<string>(graph.nodes.keys());

  const startKey = keyOf(start);
  const endKey = keyOf(end);

  const distances = new Map<string, number>([[startKey, 0]]);
  const previous = new Map<string, PreviousData>([
    [startKey, { key: '', direction: startDirection }]
  ]);
  if (startKey === endKey) return { distances, previous };

  while (unvisited.size > 0) {
    let currentDistance = Infinity;
    let currentKey = '';
    for (const [key, distance] of distances) {
      if (!unvisited.has(key) || distance >= currentDistance) continue;
      currentDistance = distance;
      currentKey = key;
    }
    if (currentKey === endKey || !currentKey) return { distances, previous };

    unvisited.delete(currentKey);

    const currentLocation = graph.nodes.get(currentKey)!;
    for (const edge of findEdgesFrom(currentLocation, graph)) {
      const targetKey = keyOf(findOtherNode(currentLocation, edge));

      const { direction: currentDirection } = previous.get(currentKey)!;
      const targetDirection = findDirection(currentLocation, edge);
      const targetDistance =
        currentDistance +
        edge[2] +
        (hasDirectionChanged(currentDirection, targetDirection) ? Scores.TURN : 0);

      if (targetDistance <= (distances.get(targetKey) ?? Infinity)) {
        distances.set(targetKey, targetDistance);
        previous.set(targetKey, { key: currentKey, direction: targetDirection });
      }
    }
  }

  return { distances, previous };
};

const findEdgesFrom = ([x, y]: Location, graph: Graph<Location>): Array<Edge<Location>> =>
  graph.edges.filter(
    (e: Edge<Location>) =>
      e && ((e[0][0] === x && e[0][1] === y) || (e[1][0] === x && e[1][1] === y))
  );
const findOtherNode = ([x, y]: Location, [[x1, y1], [x2, y2]]: Edge<Location>): Location => {
  if (x === x1 && y === y1) return [x2, y2];
  if (x === x2 && y === y2) return [x1, y1];

  throw new Error('The graph edge does not contain the source node');
};
const findDirection = ([x, y]: Location, [[x1, y1], [x2, y2]]: Edge<Location>): Direction => {
  const other = x === x1 && y === y1 ? [x2, y2] : x === x2 && y === y2 ? [x1, y1] : null;
  if (!other) throw new Error('The graph edge does not contain the source node');

  return [Math.sign(other[0] - x) as 0 | -1 | 1, Math.sign(other[1] - y) as 0 | -1 | 1];
};
const hasDirectionChanged = ([dx, dy]: Direction, [newx, newy]: Direction): boolean =>
  newx !== dx || newy !== dy;

const lengthsMap = new Map();
export const findShortestPathTiles = (
  start: Location,
  end: Location,
  graph: Graph<Location>,
  startDirection: Direction = START_DIRECTION
) => {
  const { distances } = findShortestPath(start, end, graph, startDirection);
  const endKey = keyOf(end);
  const shortestDistance = distances.get(endKey);
  if (!shortestDistance) throw new Error(`Unable to find shortest distance for ${endKey}`);
  console.log({ shortestDistance });

  lengthsMap.clear();
  const nodeSet: Set<string> = new Set<string>();
  let tileCount = 0;
  let counter = 0;
  for (const edge of graph.edges) {
    console.log(counter, edge);
    const [a, b, weight] = edge;

    if (
      isEdgeOnShortestPath(edge, shortestDistance, start, end, graph) ||
      isEdgeOnShortestPath([b, a, weight], shortestDistance, start, end, graph)
    ) {
      nodeSet.add(keyOf(a));
      nodeSet.add(keyOf(b));
      tileCount += weight - 1; // Number of sections between tiles - ending tile
    }

    counter++;
  }
  tileCount += nodeSet.size;

  return tileCount;
};
const isEdgeOnShortestPath = (
  edge: Edge<Location>,
  shortestDistance: number,
  start: Location,
  end: Location,
  graph: Graph<Location>
) => {
  const [a, b, weight] = edge;

  const directionAB = findDirection(a, edge);
  const [shortestPathLengthA, directionA] = findShortestPathLength(start, a, graph);
  const [shortestPathLengthB] = findShortestPathLength(b, end, graph, directionAB);

  const distance =
    shortestPathLengthA +
    shortestPathLengthB +
    weight +
    (hasDirectionChanged(directionA, directionAB) ? Scores.TURN : 0);

  return distance === shortestDistance;
};
const findShortestPathLength = (
  start: Location,
  end: Location,
  graph: Graph<Location>,
  direction: Direction = START_DIRECTION
): [number, Direction] => {
  const mapKey = `${keyOf(start)}/${keyOf(end)}/${keyOf(direction)}`;
  if (lengthsMap.has(mapKey)) return lengthsMap.get(mapKey);

  const { distances, previous } = findShortestPath(start, end, graph, direction);
  const endKey = keyOf(end);

  const retValue: [number, Direction] = [distances.get(endKey)!, previous.get(endKey)!.direction];
  lengthsMap.set(mapKey, retValue);

  return retValue;
};
