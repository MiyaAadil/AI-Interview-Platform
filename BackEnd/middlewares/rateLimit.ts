import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: { error: "Too many AI requests, slow down" },
});