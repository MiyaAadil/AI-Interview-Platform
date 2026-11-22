import { z } from "zod";

export const answerSchema = z.object({
  text: z.string().trim().min(10, "Answer is too short").max(5000),
});