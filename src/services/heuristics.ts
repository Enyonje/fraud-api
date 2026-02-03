import { RiskRequest } from "../utils/validation";
import { policyV1 } from "../domain/riskPolicies";

export function heuristicFactors(input: RiskRequest) {
  const factors = [];

  const largeAmount = input.amount > policyV1.thresholds.amountHigh ? 1 : 0;
  factors.push({ label: "largeAmount", weight: policyV1.weights.largeAmount, value: largeAmount });

  const unusualLocation = input.location && input.location !== "Nairobi" ? 1 : 0;
  factors.push({ label: "unusualLocation", weight: policyV1.weights.unusualLocation, value: unusualLocation });

  const missingUserId = input.userId ? 0 : 1;
  factors.push({ label: "missingUserId", weight: policyV1.weights.missingUserId, value: missingUserId });

  // Placeholder riskyAddress (to be backed by blockchain adapters)
  const riskyAddress = input.address ? 0.3 : 0;
  factors.push({ label: "riskyAddress", weight: policyV1.weights.riskyAddress, value: riskyAddress });

  return factors;
}

export function weightedScore(factors: { label: string; weight: number; value: number }[]) {
  const sum = factors.reduce((acc, f) => acc + f.weight * f.value, 0);
  return Math.min(100, Math.round(sum * 100));
}