import { describe, expect, it } from 'vitest';
import { Readable } from 'stream';
import { ReadStream } from 'fs';

import { parseInputFile, run } from './utility';
import { Computer } from './types';

describe('parseInputFile', () => {
  it('should return correct result for the input #1', async () => {
    const fileStream = Readable.from(
      ['Register A: 729', 'Register B: 0', 'Register C: 0', '', 'Program: 0,1,5,4,3,0'].join('\n')
    ) as ReadStream;

    const result = await parseInputFile(fileStream);
    expect(result).toEqual({
      A: 729n,
      B: 0n,
      C: 0n,
      program: [0, 1, 5, 4, 3, 0]
    });
  });
});

const DEFAULT_COMPUTER: Computer = {
  A: 0n,
  B: 0n,
  C: 0n,
  program: [],
  instructionPointer: 0,
  output: []
};
describe('run', () => {
  it('C = 9, program = 2,6', () => {
    const computer = { ...DEFAULT_COMPUTER, C: 9n, program: [2, 6], output: [] };
    run(computer);
    expect(computer.B).toEqual(1n);
  });
  it('A = 10, program = 5,0,5,1,5,4', () => {
    const computer = { ...DEFAULT_COMPUTER, A: 10n, program: [5, 0, 5, 1, 5, 4], output: [] };
    run(computer);
    expect(computer.output).toEqual(['0', '1', '2']);
  });
  it('A = 2024, program = 0,1,5,4,3,0', () => {
    const computer = { ...DEFAULT_COMPUTER, A: 2024n, program: [0, 1, 5, 4, 3, 0], output: [] };
    run(computer);
    expect(computer.output).toEqual(['4', '2', '5', '6', '7', '7', '7', '7', '3', '1', '0']);
    expect(computer.A).toEqual(0n);
  });
  it('B = 29, program = 1,7', () => {
    const computer = { ...DEFAULT_COMPUTER, B: 29n, program: [1, 7], output: [] };
    run(computer);
    expect(computer.B).toEqual(26n);
  });
  it('B = 2024, C = 43690, program = 4,0', () => {
    const computer = { ...DEFAULT_COMPUTER, B: 2024n, C: 43690n, program: [4, 0], output: [] };
    run(computer);
    expect(computer.B).toEqual(44354n);
  });
});
