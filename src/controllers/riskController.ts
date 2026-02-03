import { Request, Response } from "express";
import { riskRequestSchema } from "../utils/validation";
import { calculateRiskScore } from "../services/riskEngine";

export async function calculateRiskScoreHandler(req: Request, res: Response) {
  const parse = riskRequestSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: parse.error.format()
    });
  }

  const score = await calculateRiskScore(parse.data);

  // Ensure thresholds include equality
  let status: "low-risk" | "medium-risk" | "high-risk";
  if (score >= 70) {
    status = "high-risk";
  } else if (score >= 40) {
    status = "medium-risk";
  } else {
    status = "low-risk";
  }

  return res.json({
    transactionId: parse.data.transactionId,
    riskScore: score,
    status
  });
}