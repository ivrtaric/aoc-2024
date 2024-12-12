import type { Location } from '../common/types';

export enum Tiles {
  EMPTY = '.',
  ANTINODE = '#'
}

export type LocationMap = Map<string, Array<Location>>;
export type MappedArea = {
  width: number;
  height: number;
  antennas: LocationMap;
};
