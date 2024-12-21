export type PuzzleData = {
  A: bigint;
  B: bigint;
  C: bigint;
  program: Array<number>;
};

export type Computer = PuzzleData & {
  instructionPointer: number;
  output: Array<string>;
};
