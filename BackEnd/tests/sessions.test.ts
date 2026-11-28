import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("sessions routes", () => {
  it("rejects a request without a token", async () => {
    const res = await request(app).get("/api/sessions");

    expect(res.status).toBe(401);
  });
});