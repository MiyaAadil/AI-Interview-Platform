import { z } from "zod";

export const generatedQuestionsSchema = z.object({
  questions: z.array(z.string().trim().min(10)).length(5),
});

export const answerFeedbackSchema = z.object({
  score: z.number().int().min(1).max(10),
  feedback: z.string().trim().min(10),
});