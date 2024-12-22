import { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';
import { PuzzleData } from './types';

const sortByLength = (a: string, b: string) =>
  b.length > a.length ? 1 : b.length < a.length ? -1 : a > b ? 1 : -1;

export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<PuzzleData> => {
  const puzzleData: PuzzleData = {
    patterns: new Map<string, Array<string>>(),
    designs: []
  };

  let stage = 'patterns';
  await parseFile(puzzleInputFile, line => {
    switch (stage) {
      case 'patterns':
        if (line === '') {
          stage = 'designs';
        } else {
          const allPatterns = line.split(',').map(p => p.trim());
          for (const pattern of allPatterns) {
            const patternsByLetter = puzzleData.patterns.get(pattern.charAt(0)) ?? [];
            patternsByLetter.push(pattern);
            puzzleData.patterns.set(pattern.charAt(0), patternsByLetter);
          }
        }
        break;
      case 'designs':
        if (line !== '') puzzleData.designs.push(line);
        break;
      default:
        throw new Error(`Invalid stage: ${stage}`);
    }
  });
  for (const patterns of puzzleData.patterns.values()) {
    patterns.sort(sortByLength);
  }

  return puzzleData;
};

export const matchDesign = (
  design: string,
  patterns: Map<string, Array<string>>,
  cache: Map<string, number> = new Map<string, number>()
): number => {
  if (design === '') return 1;
  if (cache.has(design)) return cache.get(design)!;

  const combinationCount = (patterns.get(design.charAt(0)) ?? []).reduce(
    (cc, pattern) =>
      cc +
      (design.startsWith(pattern)
        ? matchDesign(design.substring(pattern.length), patterns, cache)
        : 0),
    0
  );

  cache.set(design, combinationCount);
  return combinationCount;
};
