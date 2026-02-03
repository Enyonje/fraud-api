import { Router } from "express";
import { calculateRiskScoreHandler } from "../controllers/riskController";

export const router = Router();

router.post("/score", calculateRiskScoreHandler);
