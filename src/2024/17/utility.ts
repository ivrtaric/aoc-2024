import { ReadStream } from 'fs';
import { parseFile } from '../common/utilities';
import { Computer, PuzzleData } from './types';

const REGEX_REGISTER = /Register (?<register>[ABC]): (?<value>\d+)/;
const REGEX_PROGRAM = /Program: (?<value>(\d(,|$))+)/;
export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<PuzzleData> => {
  const data: PuzzleData = { A: 0, B: 0, C: 0, program: [] };

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
          data[register] = Number(value);
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

const combo = (op: number, c: Computer) => {
  switch (op) {
    case 0:
    case 1:
    case 2:
    case 3:
      return op;
    case 4:
      return c.A;
    case 5:
      return c.B;
    case 6:
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
const adv = (op: number, c: Computer) => (c.A = Math.floor(c.A / Math.pow(2, combo(op, c))));
const bxl = (op: number, c: Computer) => (c.B = c.B ^ op);
const bst = (op: number, c: Computer) => (c.B = combo(op, c) % 8);
const jnz = (op: number, c: Computer) =>
  (c.instructionPointer = c.A === 0 ? c.instructionPointer : op - 2);
const bxc = (op: number, c: Computer) => (c.B = c.B ^ c.C);
const out = (op: number, c: Computer) => c.output.push(...String(combo(op, c) % 8).split(''));
const bdv = (op: number, c: Computer) => (c.B = Math.floor(c.A / Math.pow(2, combo(op, c))));
const cdv = (op: number, c: Computer) => (c.C = Math.floor(c.A / Math.pow(2, combo(op, c))));

export const INSTRUCTIONS: Record<number, (op: number, c: Computer) => void> = {
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
    INSTRUCTIONS[c.program[c.instructionPointer]](c.program[c.instructionPointer + 1], c);
    c.instructionPointer += 2;
  }

  return c.output.join(',');
};
