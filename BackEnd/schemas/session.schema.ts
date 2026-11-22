import { z } from "zod";

export const sessionSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  resumeText: z.string().trim().min(50, "Resume text looks too short"),
  jobDescription: z.string().trim().optional(),
});