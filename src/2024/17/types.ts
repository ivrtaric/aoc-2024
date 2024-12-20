export type PuzzleData = {
  A: number;
  B: number;
  C: number;
  program: Array<number>;
};

export type Computer = PuzzleData & {
  instructionPointer: number;
  output: Array<string>;
};
