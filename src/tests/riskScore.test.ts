import request from "supertest";
import { createServer } from "../app";

describe("POST /risk/score", () => {
  const app = createServer();

  it("returns low-risk for small amount in Nairobi", async () => {
    const res = await request(app).post("/risk/score").send({
      transactionId: "tx1",
      amount: 200,
      userId: "user1",
      location: "Nairobi",
    });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("low-risk");
  });

  it("returns high-risk when userId missing and location unusual", async () => {
    const res = await request(app)
      .post("/risk/score")
      .send({ transactionId: "tx2", amount: 500, location: "London" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("high-risk");
  });
});
