import { z } from "zod";

export const riskRequestSchema = z.object({
  transactionId: z.string().min(1),
  amount: z.number().nonnegative(),
  asset: z.enum(["BTC", "ETH", "USDT", "USDC"]).default("ETH"),
  userId: z.string().min(1).optional(),
  address: z.string().min(10).optional(),
  chainId: z.number().int().optional(),
  location: z.string().optional(),
  timestamp: z.number().int().optional()
});

export type RiskRequest = z.infer<typeof riskRequestSchema>;