export type RiskFactor = {
  label: string;
  weight: number; // 0 - 1
  value: number; // 0 - 1
};

export type RiskScoreResult = {
  score: number; // 0 - 100
  factors: RiskFactor[];
};