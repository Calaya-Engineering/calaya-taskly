import { z } from "zod";

export const listDailyReportsQuerySchema = z.object({
  department: z.string().trim().optional(),
  departments: z.string().trim().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
  linkedTask: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
  reportType: z.enum(["general", "daily", "task"]).optional(),
});

export type ListDailyReportsQuery = z.infer<typeof listDailyReportsQuerySchema>;
