import { z } from "zod";

export const productListQuerySchema = z.object({
  skip: z
    .string()
    .regex(/^\d+$/)
    .default("0")
    .transform(Number)
    .pipe(
      z.number().int().min(0).refine(Number.isSafeInteger),
    ),
  limit: z
    .string()
    .regex(/^\d+$/)
    .default("20")
    .transform(Number)
    .pipe(
      z.number().int().min(1).max(100),
    ),
});