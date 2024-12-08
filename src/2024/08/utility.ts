import type { ReadStream } from 'fs';
import * as readline from 'readline';
import { Location, LocationMap, MappedArea, Tiles } from './types';

export const parseFile = async (puzzleInputFile: ReadStream): Promise<MappedArea> => {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const antennas: LocationMap = new Map<string, Array<Location>>();
  let height: number = 0;
  let width: number = 0;
  for await (const line of lineReader) {
    line
      .split('')
      .filter(tile => tile !== Tiles.EMPTY && tile !== Tiles.ANTINODE)
      .forEach((tile, y) => {
        const frequencyAntennas = antennas.get(tile) ?? [];
        frequencyAntennas.push([height, y]);
        antennas.set(tile, frequencyAntennas);
      });
    height++;
    width = line.length;
  }

  return {
    width,
    height,
    antennas
  };
};

export const findAllAntiNodes = (
  mappedArea: MappedArea,
  includeAntennas = false,
  includeHarmonics = false
): Set<string> => {
  const antiNodeList = new Set<string>();

  for (const locations of mappedArea.antennas.values()) {
    for (let a = 0; a < locations.length - 1; a++) {
      for (let b = a + 1; b < locations.length; b++) {
        findAntiNodes(
          locations[a],
          locations[b],
          mappedArea,
          includeAntennas,
          includeHarmonics
        ).forEach(an => antiNodeList.add(`${an[0]},${an[1]}`));
      }
    }
  }

  return antiNodeList;
};

export const findAllAntiNodesFunctional = (
  mappedArea: MappedArea,
  includeAntennas = false,
  includeHarmonics = false
) =>
  new Set<string>(
    mappedArea.antennas
      .values()
      .flatMap(locations =>
        locations.flatMap((locationA, a) =>
          locations
            .slice(a + 1)
            .flatMap(locationB =>
              findAntiNodes(locationA, locationB, mappedArea, includeAntennas, includeHarmonics)
            )
        )
      )
      .map(an => `${an[0]},${an[1]}`)
  );

const findAntiNodes = (
  antenna1: Location,
  antenna2: Location,
  mappedArea: MappedArea,
  includeAntennas = false,
  includeAllHarmonics = false
): Array<Location> => {
  const [harmonicsLeft, harmonicsRight] = [
    findAllHarmonics(antenna1, antenna2, mappedArea),
    findAllHarmonics(antenna2, antenna1, mappedArea)
  ];

  return [
    ...(includeAntennas ? [antenna1, antenna2] : []),
    ...(includeAllHarmonics
      ? [...harmonicsLeft, ...harmonicsRight]
      : [harmonicsLeft[0], harmonicsRight[0]].filter(Boolean))
  ];
};

const findAllHarmonics = (
  location1: Location,
  location2: Location,
  mappedArea: MappedArea
): Array<Location> => {
  const [[x1, y1], [x2, y2]] = [location1, location2];
  const [distanceX, distanceY] = [Math.abs(x1 - x2), Math.abs(y1 - y2)];

  const harmonic: Location = [
    x1 + Math.sign(x1 - x2) * distanceX,
    y1 + Math.sign(y1 - y2) * distanceY
  ];

  return isInMappedArea(harmonic, mappedArea)
    ? [harmonic, ...findAllHarmonics(harmonic, location1, mappedArea)]
    : [];
};

const isInMappedArea = ([x, y]: Location, { height, width }: MappedArea): boolean =>
  x >= 0 && x < height && y >= 0 && y < width;
