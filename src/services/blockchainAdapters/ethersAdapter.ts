import { ethers } from "ethers";
import { env } from "../../config/env";

export async function getAddressRiskSignal(address: string): Promise<number> {
  if (!env.ETH_RPC_URL || !address) return 0;

  const provider = new ethers.JsonRpcProvider(env.ETH_RPC_URL);

  // Simple signal: recent activity count -> normalize to [0,1]
  const history = await provider.getTransactionCount(address);
  const signal = Math.min(1, history / 100); // naive normalization
  return signal;
}
