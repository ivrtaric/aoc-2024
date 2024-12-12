import type { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';

const BUTTON_A_REGEX = /^Button A: X\+(?<A>\d+), Y\+(?<D>\d+)$/;
const BUTTON_B_REGEX = /^Button B: X\+(?<B>\d+), Y\+(?<E>\d+)$/;
const PRIZE_REGEX = /^Prize: X=(?<C>\d+), Y=(?<F>\d+)$/;

const enum State {
  BUTTON_A = 'A',
  BUTTON_B = 'B',
  PRIZE = 'P',
  COMPLETE = 'C'
}

type System = {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
};

export const A_TOKEN_FACTOR = 3;
export const B_TOKEN_FACTOR = 1;
export const PRIZE_POSITION_MODIFIER = 10000000000000;

export const parseInputFile = async (
  puzzleInputFile: ReadStream,
  modifyPrizePosition = false
): Promise<{ systems: Array<System> }> => {
  let state = State.BUTTON_A;
  const systems: Array<System> = [];
  let currentSystem = createSystem();
  await parseFile(puzzleInputFile, line => {
    if (line === '') {
      currentSystem = createSystem();
      state = State.BUTTON_A;
      return;
    }

    switch (state) {
      case State.BUTTON_A: {
        const result = BUTTON_A_REGEX.exec(line);
        if (!result?.groups) throw new Error(`Unable to parse Button A data: ${line}`);
        currentSystem.A = Number(result.groups.A);
        currentSystem.D = Number(result.groups.D);
        state = State.BUTTON_B;
        break;
      }
      case State.BUTTON_B: {
        const result = BUTTON_B_REGEX.exec(line);
        if (!result?.groups) throw new Error(`Unable to parse Button B data: ${line}`);
        currentSystem.B = Number(result.groups.B);
        currentSystem.E = Number(result.groups.E);
        state = State.PRIZE;
        break;
      }
      case State.PRIZE: {
        const result = PRIZE_REGEX.exec(line);
        if (!result?.groups) throw new Error(`Unable to parse Prize data: ${line}`);
        currentSystem.C =
          Number(result.groups.C) + (modifyPrizePosition ? PRIZE_POSITION_MODIFIER : 0);
        currentSystem.F =
          Number(result.groups.F) + (modifyPrizePosition ? PRIZE_POSITION_MODIFIER : 0);
        systems.push(currentSystem);
        state = State.COMPLETE;
        break;
      }
      default:
        throw new Error('Invalid state');
    }
  });

  return { systems };
};

const createSystem = (): System => ({
  A: Infinity,
  B: Infinity,
  C: Infinity,
  D: Infinity,
  E: Infinity,
  F: Infinity
});

export const calculateX = ({ A, B, C, D, E, F }: System): number => {
  const divisor = B * D - E * A;
  return divisor === 0 ? Infinity : (F * B - E * C) / divisor;
};

export const calculateY = (X: number, { D, E, F }: System): number =>
  E === 0 ? Infinity : (F - D * X) / E;

export const calculateButtonPresses = (system: System): number => {
  const X = calculateX(system);
  // console.log(`X = ${X}`);
  if (X === Infinity) return 0;
  if (X - Math.floor(X) > Number.EPSILON) return 0;

  const Y = calculateY(X, system);
  // console.log(`Y = ${Y}`);
  if (Y === Infinity) return 0;
  if (Y - Math.floor(Y) > Number.EPSILON) return 0;

  return X * A_TOKEN_FACTOR + Y * B_TOKEN_FACTOR;
};
