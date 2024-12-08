export enum Tiles {
  EMPTY = '.',
  ANTINODE = '#'
}

export type Location = [number, number];
export type LocationMap = Map<string, Array<Location>>;
export type MappedArea = {
  width: number;
  height: number;
  antennas: LocationMap;
};
