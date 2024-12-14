export type System = {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
};

export type PuzzleData = { systems: Array<System> };

export const enum State {
  BUTTON_A = 'A',
  BUTTON_B = 'B',
  PRIZE = 'P',
  COMPLETE = 'C'
}

export const A_TOKEN_FACTOR = 3;
export const B_TOKEN_FACTOR = 1;
export const PRIZE_POSITION_MODIFIER = 10000000000000;
