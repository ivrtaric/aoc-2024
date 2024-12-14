import { Location, NumberPair } from '../common/types';

export type Robot = {
  position: Location;
  velocity: NumberPair;
};

export type CountsPerQuadrant = {
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
};

export const WATCHED_REGION_SIZE = 100;
export const SECONDS_CHECK_LIMIT = 200000;
