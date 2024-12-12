import type { ReadStream } from 'fs';
import { Equation } from 'src/2024/07/types';
import { parseFile } from 'src/2024/common/utilities';

export const parseInputFile = async (puzzleInputFile: ReadStream): Promise<Array<Equation>> =>
  parseFile<Equation>(puzzleInputFile, line => {
    const [strResult, strOperands] = line.split(':');

    return {
      result: Number(strResult),
      operands: strOperands
        .split(' ')
        .filter(Boolean)
        .map(strOp => Number(strOp.trim()))
    };
  });

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
      ? validateEquation(
          { result, operands: [concatenated(first, second), ...rest] },
          useConcatenation
        )
      : null)
  );
};

const concatenated = (a: number, b: number) => parseInt(`${a}${b}`, 10);
