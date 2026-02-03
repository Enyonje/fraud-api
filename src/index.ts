import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("Fraud API is live!");
});

// Risk scoring route
app.post("/risk-score", (req: Request, res: Response) => {
  const { transactionId, amount, userId, location } = req.body;

  // Dummy scoring logic for now
  let score = 0;

  if (amount > 1000) score += 30;        // Large transaction
  if (location !== "Nairobi") score += 20; // Unusual location
  if (!userId) score += 50;              // Missing user ID

  // Normalize score between 0–100
  if (score > 100) score = 100;

  res.json({
    transactionId,
    riskScore: score,
    status: score > 70 ? "high-risk" : "low-risk"
  });
});

app.listen(PORT, () => {
  console.log(`Fraud API running on port ${PORT}`);
});