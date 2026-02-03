# Fraud API

Production-grade blockchain fraud detection API with explainable scoring, strict DX, tests, and deployment-ready Docker.

## Quick start
- Dev: `npm run dev`
- Test: `npm test`
- Build: `npm run build`
- Start: `npm start`

## Endpoints
- POST `/risk/score`
  - Body:
    ```json
    {
      "transactionId": "tx123",
      "amount": 1200,
      "asset": "ETH",
      "userId": "user42",
      "address": "0x...",
      "location": "London"
    }
    ```
  - Response:
    ```json
    {
      "transactionId": "tx123",
      "riskScore": 72,
      "status": "high-risk"
    }
    ```

## Environment
- `PORT` (default 3000)
- `ETH_RPC_URL` (optional, used for on-chain signals)
- `RISK_POLICY_VERSION` (default v1)

## Philosophy
- Explainable scoring (factors + weights)
- Versioned policies for auditability
- Modular adapters to swap data sources quickly