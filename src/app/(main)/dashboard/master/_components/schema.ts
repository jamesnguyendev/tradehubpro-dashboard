import z from "zod";

export const recentLeadSchema = z.object({
  _id: z.string(),
  id: z.number(),
  name: z.string(),
  password: z.string(),
  server: z.string(),
  period: z.number(),
  percent: z.number(),
  balance: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
