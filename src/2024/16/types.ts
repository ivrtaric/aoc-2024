import type { Direction, Location, MappedArea } from '../common/types';

export type Score = number;
export type Edge<Node> = [Node, Node, Score];
export type Graph<Node> = {
  nodes: Map<string, Node>;
  edges: Array<Edge<Node>>;
};
export type PuzzleData = {
  map: MappedArea<Tiles>;
  graph: Graph<Location>;
  start: Location;
  end: Location;
};

export const enum Tiles {
  WALL = '#',
  START = 'S',
  END = 'E',
  PATH = '.'
}

export const enum Scores {
  MOVE = 1,
  TURN = 1000
}

export type Visited = Set<string>;
export type State = [Location, Direction, Score, Visited];

export type PreviousData = { key: string; direction: Direction };
