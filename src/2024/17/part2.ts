import type { ReadStream } from 'fs';
import { parseInputFile, run } from './utility';

export async function chronospatialComputer(puzzleInputFile: ReadStream): Promise<bigint> {
  const puzzleData = await parseInputFile(puzzleInputFile);

  const computer = {
    ...puzzleData,
    instructionPointer: 0,
    output: []
  };
  const min_2_47 = 140_737_488_355_328n;
  const exp_2_25 = 2n ** 25n;
  const common_lower_value = 23948989n; // 1 011 011 010 110 111 010 111 101

  const expectedResult = puzzleData.program.join(',');
  let A = 1n;
  for (;;) {
    const value: bigint = min_2_47 + A * exp_2_25 + common_lower_value;

    computer.A = value;
    computer.instructionPointer = 0;
    computer.output = [];

    const result = run(computer);
    if (result === expectedResult) return value;

    A++;
  }

  return 0n;
}
