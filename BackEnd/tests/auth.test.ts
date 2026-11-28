import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../lib/prisma";

const email = `test-${Date.now()}@example.com`;
const password = "secret123";

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email } });
  await prisma.$disconnect();
});

describe("auth routes", () => {
  it("registers a new user", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ username: "testuser", email, password });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(email);
  });

  it("rejects a duplicate email", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ username: "testuser", email, password });

    expect(res.status).toBe(409);
  });

  it("rejects a wrong password", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email, password: "wrongpassword" });

    expect(res.status).toBe(401);
  });

  it("logs in with the right password", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});