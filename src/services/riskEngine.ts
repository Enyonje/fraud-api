import { RiskRequest } from "../utils/validation";
import { heuristicFactors, weightedScore } from "./heuristics";
import { getAddressRiskSignal } from "./blockchainAdapters/ethersAdapter";
import { getSanctionsSignal } from "./blockchainAdapters/chainalysisAdapter";

export async function calculateRiskScore(input: RiskRequest): Promise<number> {
  const baseFactors = heuristicFactors(input);

  // Enrich with blockchain signals when address provided
  if (input.address) {
    const onchainSignal = await getAddressRiskSignal(input.address);
    const sanctionsSignal = await getSanctionsSignal(input.address);
    baseFactors.push({
      label: "onchainActivity",
      weight: 0.15,
      value: onchainSignal,
    });
    baseFactors.push({
      label: "sanctionsExposure",
      weight: 0.15,
      value: sanctionsSignal,
    });
  }

  return weightedScore(baseFactors);
}
