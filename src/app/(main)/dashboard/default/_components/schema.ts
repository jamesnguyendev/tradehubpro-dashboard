import { z } from "zod";

export const sectionSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  verify: z.string(),
  createdAt: z.string(),
});
