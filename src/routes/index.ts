import { Router } from "express";
import { router as riskRouter } from "./risk";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ status: "Fraud API is live", version: "1.0.0" });
});

router.use("/risk", riskRouter);

export default router;