export type Region = {
  type: string;
  plots: Set<string>;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};
