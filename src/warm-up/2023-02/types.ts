export type CubeCount = {
  red: number;
  green: number;
  blue: number;
};
export type GameData = {
  id: number;
  sets: Array<Partial<CubeCount>>;
};
