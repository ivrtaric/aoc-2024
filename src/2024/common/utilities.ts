import { Location } from './types';

export const keyOf = ([x, y]: Location): string => `${x},${y}`;

export const xor = (a: boolean, b: boolean): boolean => (a && !b) || (!a && b);
