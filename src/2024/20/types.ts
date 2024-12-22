import { Location, MappedArea } from '../common/types';

export enum Tiles {
  START = 'S',
  END = 'E',
  WALL = '#',
  PATH = '.'
}

export type PuzzleData = {
  map: MappedArea<string | number>;
  start: Location;
  end: Location;
};
