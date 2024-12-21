import { ReadStream } from 'fs';
import { parseFile } from '../common/utilities';
import { Computer, PuzzleData } from './types';

const REGEX_REGISTER = /Register (?<register>[ABC]): (?<value>\d+)/;
const REGEX_PROGRAM = /Program: (?<value>(\d(,|$))+)/;
export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<PuzzleData> => {
  const data: PuzzleData = { A: 0n, B: 0n, C: 0n, program: [] };

  let state = 'registers';
  await parseFile(puzzleInputFile, line => {
    if (line === '') {
      state = 'program';
      return;
    }

    if (state === 'registers') {
      const result = REGEX_REGISTER.exec(line);
      const { register, value } = result?.groups ?? {};
      switch (register) {
        case 'A':
        case 'B':
        case 'C':
          data[register] = BigInt(value);
          break;
        default:
          throw new Error('Unrecognized input state');
      }
    } else if (state === 'program') {
      const result = REGEX_PROGRAM.exec(line);
      data.program = result!.groups!.value.split(',').map(Number);
    } else throw new Error('Unrecognized input state');
  });

  return data;
};

const combo = (op: bigint, c: Computer) => {
  switch (op) {
    case 0n:
    case 1n:
    case 2n:
    case 3n:
      return op;
    case 4n:
      return c.A;
    case 5n:
      return c.B;
    case 6n:
      return c.C;
    default:
      throw new Error('Unrecognized combo op');
  }
};
// 100000001000000010000000100000001000000010000000
// 2,4,1,1,7,5,1,5,4,5,0,3,5,5,3,0
// bst(4) --- c.A % 8 => c.B
// bxl(1) --- c.B ^ 1 => c.B
// cdv(5) --- c.A / 2 ^^ c.B => c.C
// bxl(5) --- c.B ^ 5 => c.B
// bxc(5) --- c.B ^ c.C => c.B
// adv(3) --- c.A / 8 => c.A
// out(5) --- c.B % 8 => []
// jnz(0) --- Jump if c.A <> 0
const adv = (op: bigint, c: Computer) => (c.A = c.A / 2n ** combo(op, c));
const bxl = (op: bigint, c: Computer) => (c.B = c.B ^ op);
const bst = (op: bigint, c: Computer) => (c.B = combo(op, c) % 8n);
const jnz = (op: bigint, c: Computer) =>
  (c.instructionPointer = c.A === 0n ? c.instructionPointer : Number(op - 2n));
const bxc = (op: bigint, c: Computer) => (c.B = c.B ^ c.C);
const out = (op: bigint, c: Computer) => c.output.push(...String(combo(op, c) % 8n).split(''));
const bdv = (op: bigint, c: Computer) => (c.B = c.A / 2n ** combo(op, c));
const cdv = (op: bigint, c: Computer) => (c.C = c.A / 2n ** combo(op, c));

export const INSTRUCTIONS: Record<number, (op: bigint, c: Computer) => void> = {
  0: adv,
  1: bxl,
  2: bst,
  3: jnz,
  4: bxc,
  5: out,
  6: bdv,
  7: cdv
};

export const run = (c: Computer): string => {
  c.instructionPointer = 0;
  for (;;) {
    if (c.instructionPointer >= c.program.length) {
      break;
    }
    INSTRUCTIONS[c.program[c.instructionPointer]](BigInt(c.program[c.instructionPointer + 1]), c);
    c.instructionPointer += 2;
  }

  return c.output.join(',');
};
