// Versioned policies to keep scoring auditable and explainable
export const policyV1 = {
  weights: {
    largeAmount: 0.3, // 30 points if amount > threshold
    unusualLocation: 0.2, // 20 points if location not default
    missingUserId: 0.5, // bumped to 50 points to push into high-risk
    riskyAddress: 0.2, // 20 points if address flagged
  },
  thresholds: {
    amountHigh: 1000, // large transaction threshold
  },
};
