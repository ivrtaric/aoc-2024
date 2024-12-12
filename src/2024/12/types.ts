export type Garden = Array<Array<string>>;
export type Location = [number, number];
export type Region = {
  type: string;
  plots: Set<string>;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
};
