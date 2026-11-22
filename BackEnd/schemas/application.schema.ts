import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  role: z.string().trim().min(1, "Role is required"),
  status: z.enum(["applied", "interview", "offer", "rejected"]),
});