import type { ReadStream } from 'fs';
import * as readline from 'readline';
import { Equation } from 'src/2024/07/types';

export const parseFile = async (puzzleInputFile: ReadStream): Promise<Array<Equation>> => {
  const lineReader = readline.createInterface({
    input: puzzleInputFile,
    crlfDelay: Infinity
  });

  const equations: Array<Equation> = [];
  for await (const line of lineReader) {
    const [strResult, strOperands] = line.split(':');
    equations.push({
      result: parseInt(strResult, 10),
      operands: strOperands
        .split(' ')
        .filter(Boolean)
        .map(strOp => parseInt(strOp.trim(), 10))
    });
  }

  return equations;
};

export const validateEquation = (eq: Equation, useConcatenation = false): number | null => {
  const { result, operands } = eq;

  if (!operands?.length) return null;

  if (operands.length === 1) return operands[0] === result ? result : null;
  if (operands[0] > result) return null;

  const [first, second, ...rest] = operands;

  return (
    validateEquation({ result, operands: [first + second, ...rest] }, useConcatenation) ??
    validateEquation({ result, operands: [first * second, ...rest] }, useConcatenation) ??
    (useConcatenation
      ? validateEquation({ result, operands: [concatenated(first, second), ...rest] }, useConcatenation)
      : null)
  );
};

const concatenated = (a: number, b: number) => parseInt(`${a}${b}`, 10);
