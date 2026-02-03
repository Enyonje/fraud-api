import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 3000),
  NODE_ENV: process.env.NODE_ENV || "development",
  // Add blockchain API keys as needed
  ETH_RPC_URL: process.env.ETH_RPC_URL || "",
  RISK_POLICY_VERSION: process.env.RISK_POLICY_VERSION || "v1"
};